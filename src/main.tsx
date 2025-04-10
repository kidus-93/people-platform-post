
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeData } from './lib/mockData';

// Initialize mock data from localStorage before rendering
initializeData();

createRoot(document.getElementById("root")!).render(<App />);
