
import MainPage from './pages/MainPage'
import ToggleSwitch from './theme/ToggleSwitch'

export default function App() {
  return (
    <div>
      <div className='flex justify-center items-center'>
        <h1 className='font-bold text-blue-500 text-3xl text-center mb-2 pt-6'>Website Comparison & Content Analyzer</h1>
        <div className="absolute top-4 right-4 z-50 pt-10 md:pt-4">
          <ToggleSwitch />
        </div>
      </div>
      <div>
        <MainPage></MainPage>
      </div>
    </div>
  )
}
