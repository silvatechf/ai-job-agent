// frontend/src/App.jsx

import { useState } from 'react';
import { 
  Container, Typography, Box, TextField, Button, Card, CardContent, 
  CircularProgress, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Chip,
  Snackbar, Alert, ToggleButton, ToggleButtonGroup, ThemeProvider, createTheme, Paper,
  Tooltip, IconButton, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions,
  Accordion, AccordionSummary, AccordionDetails, Link
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  CheckCircleOutline, HighlightOff, LightbulbOutlined, 
  CloudUpload, Description as FileIcon, AutoAwesome, WorkOutline, PersonOutline, ContentCopy,
  TextFields, InfoOutlined, GitHub, LinkedIn, ExpandMore, BusinessCenter
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- 1. CUSTOM THEME (PREMIUM VISUALS) ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Modern Indigo
      light: '#818cf8',
      dark: '#4338ca',
    },
    secondary: {
      main: '#ec4899', // Pink for subtle highlights
    },
    background: {
      default: '#f8fafc', // Slate-50
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate-900
      secondary: '#64748b', // Slate-500
    }
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0,0,0,0.05)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 50 }
      }
    }
  }
});

// --- 2. FOOTER COMPONENT ---
function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, mt: 'auto', borderTop: '1px solid #e2e8f0', bgcolor: '#fff' }}>
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Engineered by <strong>Fernando Silva</strong>. Based in Barcelona 🇪🇸
        </Typography>
        <Box>
          {/* REPLACE WITH YOUR REAL LINKS */}
          <IconButton href="https://github.com/silvatechf" target="_blank" aria-label="GitHub">
            <GitHub />
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/fernando-silva-83b155a4/" target="_blank" aria-label="LinkedIn" color="primary">
            <LinkedIn />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

// --- 3. RESULTS COMPONENT ---
function AnalysisResult({ data }) {
  const { t } = useTranslation();
  if (!data) return null; 
  
  if (data.error) return (
    <Card sx={{ mt: 4, bgcolor: '#fef2f2', border: '1px solid #fecaca' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" color="error">Error: {data.error}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Card sx={{ mt: 6, overflow: 'visible' }}>
      <CardContent sx={{ p: 5 }}>
        
        {/* Report Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h5" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesome /> {t('report_title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-Generated Analysis (Powered by Google Gemini)
              </Typography>
            </Box>
            
            {/* Score Badge */}
            <Paper elevation={0} sx={{ 
                bgcolor: data.match_score > 70 ? '#dcfce7' : '#fef9c3', 
                color: data.match_score > 70 ? '#166534' : '#854d0e',
                px: 3, py: 1, borderRadius: 50, fontWeight: 'bold', fontSize: '1.2rem',
                border: '1px solid', borderColor: data.match_score > 70 ? '#86efac' : '#fde047'
            }}>
                {data.match_score}% Match
            </Paper>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          {/* Strong Points */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: '#f0fdf4', borderRadius: 3, height: '100%', border: '1px solid #bbf7d0' }}>
                <Typography variant="h6" sx={{ color: '#166534', mb: 2, display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutline sx={{ mr: 1 }} /> {t('strong_points')}
                </Typography>
                <List dense>
                {data.strong_points?.map((point, index) => (
                    <ListItem key={index} sx={{ px: 0, alignItems: 'flex-start' }}>
                      <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}><CheckCircleOutline fontSize="small" color="success" /></ListItemIcon>
                      <ListItemText primary={point} primaryTypographyProps={{ color: '#14532d', lineHeight: 1.5 }} />
                    </ListItem>
                ))}
                </List>
            </Box>
          </Grid>

          {/* Gaps */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: '#fef2f2', borderRadius: 3, height: '100%', border: '1px solid #fecaca' }}>
                <Typography variant="h6" sx={{ color: '#991b1b', mb: 2, display: 'flex', alignItems: 'center' }}>
                <HighlightOff sx={{ mr: 1 }} /> {t('gaps')}
                </Typography>
                <List dense>
                {data.gaps?.map((gap, index) => (
                    <ListItem key={index} sx={{ px: 0, alignItems: 'flex-start' }}>
                      <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}><HighlightOff fontSize="small" color="error" /></ListItemIcon>
                      <ListItemText primary={gap} primaryTypographyProps={{ color: '#7f1d1d', lineHeight: 1.5 }} />
                    </ListItem>
                ))}
                </List>
            </Box>
          </Grid>
        </Grid>

        {/* Suggestion Section with Copy Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {t('suggestion')}
            </Typography>
            <Tooltip title="Copy to clipboard">
                <IconButton onClick={() => navigator.clipboard.writeText(data.suggestion)}>
                    <ContentCopy fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', mt: 1, p: 3, bgcolor: '#eff6ff', borderRadius: 3, border: '1px solid #bfdbfe', gap: 2 }}>
          <LightbulbOutlined sx={{ color: '#6366f1', fontSize: 30, mt: 0.3 }} />
          <Typography variant="body1" sx={{ color: '#1e3a8a', lineHeight: 1.6 }}>
            {data.suggestion}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// --- 4. MAIN APP COMPONENT ---
function App() {
  const { t, i18n } = useTranslation();
  const [jobDescription, setJobDescription] = useState('');
  
  // Input States
  const [cvFile, setCvFile] = useState(null); 
  const [cvText, setCvText] = useState('');
  const [tabValue, setTabValue] = useState(0); // 0 = PDF, 1 = Text

  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Modal State
  const [openAbout, setOpenAbout] = useState(false);

  const handleLanguageChange = (event, newLang) => {
    if (newLang) i18n.changeLanguage(newLang);
  };
  const handleCloseError = () => setErrorOpen(false);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // 10MB Limit Check
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(t('error_size'));
        setErrorOpen(true);
        return;
      }
      setCvFile(file);
    }
  };

  const handleAnalyze = () => {
    // Form Validation
    if (!jobDescription) {
        setErrorMessage(t('error_empty'));
        setErrorOpen(true);
        return;
    }
    if (tabValue === 0 && !cvFile) {
        setErrorMessage("Please upload a PDF file.");
        setErrorOpen(true);
        return;
    }
    if (tabValue === 1 && !cvText) {
        setErrorMessage("Please paste your CV text.");
        setErrorOpen(true);
        return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    // Prepare Data
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    
    if (tabValue === 0) {
        formData.append("cvFile", cvFile);
    } else {
        formData.append("cvText", cvText);
    }

    // API Call with Language Param
    const currentLang = i18n.language; 
    const url = `http://localhost:8082/api/analyze?lang=${currentLang}`;

    fetch(url, { method: 'POST', body: formData })
      .then((response) => response.json())
      .then((data) => {
        if(data.error) throw new Error(data.error);
        setAnalysisResult(data); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage(error.message || t('error_generic'));
        setErrorOpen(true);
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>{errorMessage}</Alert>
      </Snackbar>

      {/* --- ABOUT MODAL --- */}
      <Dialog open={openAbout} onClose={() => setOpenAbout(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main', borderBottom: '1px solid #eee' }}>
            {t('about_title')}
          </DialogTitle>
          
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#0f172a' }}>
                {t('about_how_title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {t('about_how_desc')}
              </Typography>
              <Typography variant="body2" component="div" sx={{ bgcolor: '#f0fdf4', p: 2, borderRadius: 2, color: '#166534' }}>
                ✨ <strong>{t('about_simple')}</strong> {t('about_simple_desc')} <br />
                🔒 <strong>{t('about_secure')}</strong> {t('about_secure_desc')}
              </Typography>
            </Box>

            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ bgcolor: '#f8fafc' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#475569', display: 'flex', alignItems: 'center', gap: 1 }}>
                   {t('about_tech_title')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 1, color: '#0f172a' }}>Backend (The Engine)</Typography>
                <Typography variant="caption" color="text.secondary" paragraph sx={{ display: 'block', pl: 1, borderLeft: '2px solid #6366f1' }}>
                  • <strong>Java 17 & Spring Boot 3.3</strong><br />
                  • <strong>Spring AI</strong> (LLM Orchestration)<br />
                  • <strong>Apache PDFBox</strong> (PDF Parsing)<br />
                  • <strong>Google Vertex AI Gemini</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, color: '#0f172a' }}>Frontend (The Experience)</Typography>
                <Typography variant="caption" color="text.secondary" paragraph sx={{ display: 'block', pl: 1, borderLeft: '2px solid #ec4899' }}>
                  • <strong>React & Vite</strong><br />
                  • <strong>Material-UI</strong> (Custom Theme)<br />
                  • <strong>i18next</strong> (Internationalization)
                </Typography>
                
                {/* Data Flow Diagram */}
                <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f1f5f9', borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', mb: 0.5 }}>
                        Data Flow:
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', display: 'block' }}>
                        React (Upload) ➝ Java Controller ➝ PDF Parsing ➝ Prompt Eng. ➝ Gemini API ➝ JSON Response
                    </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid #eee', justifyContent: 'space-between' }}>
            <Button onClick={() => setOpenAbout(false)} color="inherit">{t('about_btn_close')}</Button>
            <Button href="https://github.com/SEU_USUARIO/ai-job-agent" target="_blank" size="small" startIcon={<GitHub />} sx={{ color: 'text.secondary' }}>{t('about_btn_code')}</Button>
          </DialogActions>
      </Dialog>
      {/* --- END MODAL --- */}

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Container maxWidth="md" sx={{ py: 6, flexGrow: 1 }}>
          
          {/* Header & Navbar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 }}>
             <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box sx={{ 
                        bgcolor: 'white', p: 1.5, borderRadius: 3, boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <BusinessCenter sx={{ color: '#4f46e5', fontSize: 32 }} />
                        <AutoAwesome sx={{ color: '#ec4899', fontSize: 18, ml: -1, mt: -2 }} /> 
                    </Box>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1.2 }}>
                            {t('title')}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                            fontWeight: 600, 
                            background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem'
                        }}>
                            By Fernando Silva
                        </Typography>
                    </Box>
                </Box>
             
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: '500px', lineHeight: 1.6 }}>
                    {t('subtitle')}
                </Typography>
             </Box>

             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                <Tooltip title="Tech Stack Info">
                    <IconButton onClick={() => setOpenAbout(true)} sx={{ bgcolor: 'white', boxShadow: 1, mb: 1 }}>
                      <InfoOutlined color="primary" />
                    </IconButton>
                </Tooltip>
                <ToggleButtonGroup value={i18n.language} exclusive onChange={handleLanguageChange} size="small" sx={{ bgcolor: 'white', boxShadow: 1, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                    <ToggleButton value="en" sx={{ px: 2, fontWeight: 600, fontSize: '0.9rem' }}>🇬🇧 EN</ToggleButton>
                    <ToggleButton value="es" sx={{ px: 2, fontWeight: 600, fontSize: '0.9rem' }}>🇪🇸 ES</ToggleButton>
                </ToggleButtonGroup>
             </Box>
          </Box>

          {/* Main Input Card */}
          <Card sx={{ p: 2, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
                <Grid container spacing={4}>
                    
                    {/* Left: CV Input (Tabs) */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                            <PersonOutline sx={{ mr: 1 }} />
                            <Typography variant="h6">Your CV</Typography>
                        </Box>
                        
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="cv input type" sx={{ mb: 2, minHeight: '36px' }}>
                            <Tab icon={<FileIcon fontSize="small" />} iconPosition="start" label={t('tab_pdf')} sx={{ minHeight: '36px', textTransform: 'none' }} />
                            <Tab icon={<TextFields fontSize="small" />} iconPosition="start" label={t('tab_text')} sx={{ minHeight: '36px', textTransform: 'none' }} />
                        </Tabs>

                        {tabValue === 0 ? (
                             <Box component="label" sx={{ 
                                border: '2px dashed', borderColor: cvFile ? 'success.light' : 'divider', borderRadius: 3, 
                                p: 4, textAlign: 'center', bgcolor: cvFile ? '#f0fdf4' : '#f8fafc', 
                                transition: 'all 0.3s', '&:hover': { bgcolor: '#f1f5f9', borderColor: 'primary.main' }, 
                                cursor: 'pointer', height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
                            }}>
                                <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
                                {cvFile ? (
                                    <>
                                    <FileIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{cvFile.name}</Typography>
                                    <Chip label={t('cv_change')} size="small" color="success" variant="outlined" sx={{ mt: 2, bgcolor: 'white' }} />
                                    </>
                                ) : (
                                    <>
                                    <CloudUpload color="primary" sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>{t('cv_placeholder')}</Typography>
                                    <Typography variant="caption" color="text.secondary">{t('cv_limit')}</Typography>
                                    </>
                                )}
                            </Box>
                        ) : (
                            <TextField
                                fullWidth multiline rows={10} variant="outlined"
                                placeholder="Paste your resume text here..."
                                value={cvText} onChange={(e) => setCvText(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#fff', height: '280px', alignItems: 'flex-start' } }}
                            />
                        )}
                    </Grid>

                    {/* Right: Job Description */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'primary.main', mt: 5.5 }}> 
                            <WorkOutline sx={{ mr: 1 }} />
                            <Typography variant="h6">{t('job_label')}</Typography>
                        </Box>
                        <TextField
                            fullWidth multiline rows={10} variant="outlined"
                            placeholder={t('job_placeholder')}
                            value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#fff', height: '280px', alignItems: 'flex-start' } }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Button variant="contained" size="large" onClick={handleAnalyze} disabled={isLoading} startIcon={!isLoading && <AutoAwesome />} sx={{ px: 8, py: 2, fontSize: '1.1rem', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)', background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.6)', } }}>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : t('btn_analyze')}
                </Button>
                </Box>
            </CardContent>
          </Card>

          <AnalysisResult data={analysisResult} />
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;