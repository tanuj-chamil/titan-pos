import './App.css'
import { ThemeProvider } from './components/ui/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className='flex flex-col justify-center text-center h-dvh'>
        <h1 className='text-xl w-full'>Electron + Vite + TailwindCSS + shadcn/ui!</h1>
        <h2 className='w-full'> - boilerplate from tan0s - </h2>
      </div>
    </ThemeProvider>
  )
}

export default App
