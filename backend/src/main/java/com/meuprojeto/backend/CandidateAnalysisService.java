package com.meuprojeto.backend;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Service responsible for the business logic of CV analysis.
 * Handles file processing, text extraction, and AI interaction.
 */
@Service
public class CandidateAnalysisService {

    private static final Logger logger = LoggerFactory.getLogger(CandidateAnalysisService.class);
    private final ChatClient chatClient;

    public CandidateAnalysisService(ChatModel chatModel) {
        this.chatClient = ChatClient.create(chatModel);
    }

    /**
     * Processes the analysis request.
     * * @param cvFile The uploaded PDF file (optional)
     * @param cvText The pasted raw text (optional)
     * @param jobDescription The job description text
     * @param lang The requested response language ("en" or "es")
     * @return A Map containing the AI analysis (JSON format) or an error message.
     */
    public Map<String, Object> processAnalysis(MultipartFile cvFile, String cvText, String jobDescription, String lang) {
        
        // 1. Input Validation & Text Extraction
        String finalCvText;
        try {
            if (cvFile != null && !cvFile.isEmpty()) {
                // Security Check: Validate MIME type
                if (!"application/pdf".equals(cvFile.getContentType())) {
                    logger.warn("Invalid file type uploaded: {}", cvFile.getContentType());
                    throw new IllegalArgumentException("Uploaded file must be a PDF.");
                }
                
                logger.info("Processing PDF file: {}", cvFile.getOriginalFilename());
                finalCvText = extractPdfText(cvFile);
                
            } else if (cvText != null && !cvText.trim().isEmpty()) {
                logger.info("Processing pasted raw text input.");
                finalCvText = cvText;
            } else {
                logger.warn("No CV input provided.");
                throw new IllegalArgumentException("Please upload a PDF file or paste your CV text.");
            }
        } catch (IOException e) {
            logger.error("Failed to parse PDF file.", e);
            return Map.of("error", "Failed to read PDF file: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return Map.of("error", e.getMessage());
        }

        // 2. Determine Target Language
        String targetLanguage = "es".equalsIgnoreCase(lang) ? "SPANISH" : "ENGLISH";

        // 3. Prompt Engineering
        String systemPrompt = "You are a 'Recruiter AI', an expert tech recruiter for the European market. " +
                              "Your mission is to provide a critical and direct analysis. " + 
                              "Your response MUST be ONLY in JSON format. " +
                              "The response language MUST be **" + targetLanguage + "**, regardless of the input language. " +
                              "The 'match_score' key must be an integer (0-100). " +
                              "The 'strong_points' and 'gaps' keys must be string arrays. " +
                              "The 'suggestion' key must be a string of 1-2 practical sentences.";

        String userPrompt = String.format("""
            CV CONTENT:
            %s

            JOB DESCRIPTION:
            %s
            """, finalCvText, jobDescription);

        // 4. AI Model Invocation
        logger.info("Sending request to Google Vertex AI (Gemini)...");
        return this.chatClient.prompt()
                .system(systemPrompt)
                .user(userPrompt)
                .call()
                .entity(Map.class);
    }

    // Helper method for PDF parsing
    private String extractPdfText(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
}