import { Box, Typography, Link, Container } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#f1f5f9', borderTop: '1px solid #e2e8f0' }}>
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} <strong>Fernando Silva</strong>. Built in Barcelona 🇪🇸
        </Typography>
        <Box>
          <Link href="https://github.com/silvatechf" target="_blank" sx={{ mr: 2, color: 'text.secondary', '&:hover': { color: '#333' } }}>
            <GitHub />
          </Link>
          <Link href="https://www.linkedin.com/in/fernando-silva-83b155a4/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: '#0077b5' } }}>
            <LinkedIn />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}