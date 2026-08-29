import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CalculatorForm from './components/CalculatorForm';
import Results from './components/Results';
import Footer from './components/Footer';
import { defaultAnswers } from './data/defaultAnswers';
import { calculateFootprint } from './utils/calculations';
import { useLocalStorage } from './utils/useLocalStorage';

const STORAGE_KEY = 'ring.carbonCalculator.v1';

export default function App() {
  const [saved, setSaved, clearSaved] = useLocalStorage(STORAGE_KEY, null);
  const [view, setView] = useState(saved ? 'results' : 'home');
  const [answers, setAnswers] = useState(saved?.answers ?? defaultAnswers);
  const [result, setResult] = useState(saved?.result ?? null);

  function handleStart() {
    setView('calculator');
  }

  function handleCalculate(finalAnswers) {
    const computed = calculateFootprint(finalAnswers);
    setAnswers(finalAnswers);
    setResult(computed);
    setSaved({ answers: finalAnswers, result: computed });
    setView('results');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function handleCalculateAgain() {
    setView('calculator');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function handleReset() {
    clearSaved();
    setAnswers(defaultAnswers);
    setResult(null);
    setView('home');
  }

  function handleLogoClick() {
    setView(result ? 'results' : 'home');
  }

  return (
    <>
      <Navbar onLogoClick={handleLogoClick} hasResult={Boolean(result)} onViewResults={() => setView('results')} />
      <main style={{ flex: 1 }}>
        {view === 'home' && <Hero onStart={handleStart} />}
        {view === 'calculator' && (
          <CalculatorForm initialAnswers={answers} onComplete={handleCalculate} />
        )}
        {view === 'results' && result && (
          <Results
            answers={answers}
            result={result}
            onCalculateAgain={handleCalculateAgain}
            onReset={handleReset}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
