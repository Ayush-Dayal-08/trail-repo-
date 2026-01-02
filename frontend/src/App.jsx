import { useState } from 'react'
import Header from './Components/Header'
import FileUpload from './Components/FileUpload'
import AccountList from './Components/AccountList'
import AccountDetail from './Components/AccountDetail'

function App() {
  // Simple state-based routing (no react-router needed!)
  const [currentView, setCurrentView] = useState('upload') // 'upload', 'list', 'detail'
  const [accounts, setAccounts] = useState([])
  const [selectedAccountId, setSelectedAccountId] = useState(null)

  const handleUploadSuccess = (data) => {
    setAccounts(data.predictions || [])
    setCurrentView('list')
  }

  const handleAccountClick = (accountId) => {
    setSelectedAccountId(accountId)
    setCurrentView('detail')
    // Update URL for demo purposes
    window.history.pushState({}, '', `/account/${accountId}`)
  }

  const handleBackToList = () => {
    setCurrentView('list')
    window.history.pushState({}, '', '/')
  }

  return (
    <div className="min-h-screen mesh-bg">
      <Header onLogoClick={() => { setCurrentView('upload'); window.history.pushState({}, '', '/') }} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'upload' && (
          <FileUpload onSuccess={handleUploadSuccess} />
        )}
        
        {currentView === 'list' && (
          <AccountList 
            accounts={accounts} 
            onAccountClick={handleAccountClick} 
          />
        )}
        
        {currentView === 'detail' && (
          <AccountDetail 
            accountId={selectedAccountId}
            onBack={handleBackToList}
          />
        )}
      </main>
    </div>
  )
}

export default App