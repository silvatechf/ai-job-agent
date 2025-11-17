package com.meuprojeto.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * REST Controller for handling Analysis requests.
 * Delegates business logic to CandidateAnalysisService.
 */
@RestController
@CrossOrigin("http://localhost:5173")
public class AnalysisController {

    private final CandidateAnalysisService analysisService;

    @Autowired
    public AnalysisController(CandidateAnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @PostMapping("/api/analyze")
    public Map<String, Object> analyze(
            @RequestParam(value = "cvFile", required = false) MultipartFile cvFile,
            @RequestParam(value = "cvText", required = false) String cvText,
            @RequestParam("jobDescription") String jobDescription,
            @RequestParam(value = "lang", defaultValue = "en") String lang
    ) {
        // Delegate to Service Layer
        return analysisService.processAnalysis(cvFile, cvText, jobDescription, lang);
    }
}