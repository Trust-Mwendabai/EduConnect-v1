import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Volume2, VolumeX, Type, Palette, Keyboard, Mouse, Zap, Moon, Sun, Contrast, Focus, X } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../common/GradientStyles'

const AccessibilityPanel = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: true,
    darkMode: false,
    colorBlindMode: 'none'
  })

  const [isListening, setIsListening] = useState(false)
  const [speechRate, setSpeechRate] = useState(1.0)
  const [speechVolume, setSpeechVolume] = useState(1.0)

  useEffect(() => {
    // Apply accessibility settings to the document
    const root = document.documentElement
    
    // Font size classes
    root.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl')
    switch (settings.fontSize) {
      case 'small':
        root.classList.add('text-sm')
        break
      case 'normal':
        root.classList.add('text-base')
        break
      case 'large':
        root.classList.add('text-lg')
        break
      case 'extra-large':
        root.classList.add('text-xl')
        break
    }

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Dark mode
    if (settings.darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Focus visible
    if (settings.focusVisible) {
      root.classList.add('focus-visible-enabled')
    } else {
      root.classList.remove('focus-visible-enabled')
    }

    // Color blind modes
    root.classList.remove('colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia')
    if (settings.colorBlindMode !== 'none') {
      root.classList.add(`colorblind-${settings.colorBlindMode}`)
    }
  }, [settings])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const toggleScreenReader = () => {
    if (!settings.screenReader) {
      // Initialize screen reader
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Screen reader mode activated. Use arrow keys to navigate.')
        utterance.rate = speechRate
        utterance.volume = speechVolume
        speechSynthesis.speak(utterance)
      }
    }
    updateSetting('screenReader', !settings.screenReader)
  }

  const readPageContent = () => {
    if ('speechSynthesis' in window) {
      setIsListening(true)
      const pageContent = document.body.innerText
      const utterance = new SpeechSynthesisUtterance(pageContent)
      utterance.rate = speechRate
      utterance.volume = speechVolume
      utterance.onend = () => setIsListening(false)
      speechSynthesis.speak(utterance)
    }
  }

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsListening(false)
    }
  }

  const FontSizeControls = () => (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
        <Type className="w-4 h-4" />
        Text Size
      </h4>
      <div className="grid grid-cols-4 gap-2">
        {[
          { size: 'small', label: 'A', class: 'text-xs' },
          { size: 'normal', label: 'A', class: 'text-sm' },
          { size: 'large', label: 'A', class: 'text-lg' },
          { size: 'extra-large', label: 'A', class: 'text-xl' }
        ].map((option) => (
          <button
            key={option.size}
            onClick={() => updateSetting('fontSize', option.size)}
            className={`p-3 rounded-lg border-2 transition-all ${
              settings.fontSize === option.size
                ? 'border-[#011F5B] bg-[#011F5B]/10'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            aria-label={`Set font size to ${option.size}`}
          >
            <span className={option.class}>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  const VisualControls = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
        <Eye className="w-4 h-4" />
        Visual Settings
      </h4>
      
      <div className="space-y-3">
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Contrast className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">High Contrast</span>
          </div>
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) => updateSetting('highContrast', e.target.checked)}
            className="w-5 h-5 text-[#011F5B] rounded focus:ring-[#011F5B]"
          />
        </label>

        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Moon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Dark Mode</span>
          </div>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={(e) => updateSetting('darkMode', e.target.checked)}
            className="w-5 h-5 text-[#011F5B] rounded focus:ring-[#011F5B]"
          />
        </label>

        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Reduced Motion</span>
          </div>
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
            className="w-5 h-5 text-[#011F5B] rounded focus:ring-[#011F5B]"
          />
        </label>

        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Focus className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Focus Indicators</span>
          </div>
          <input
            type="checkbox"
            checked={settings.focusVisible}
            onChange={(e) => updateSetting('focusVisible', e.target.checked)}
            className="w-5 h-5 text-[#011F5B] rounded focus:ring-[#011F5B]"
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Color Vision Support</label>
        <select
          value={settings.colorBlindMode}
          onChange={(e) => updateSetting('colorBlindMode', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
        >
          <option value="none">Normal</option>
          <option value="protanopia">Protanopia (Red-blind)</option>
          <option value="deuteranopia">Deuteranopia (Green-blind)</option>
          <option value="tritanopia">Tritanopia (Blue-blind)</option>
        </select>
      </div>
    </div>
  )

  const ScreenReaderControls = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
        <Volume2 className="w-4 h-4" />
        Screen Reader
      </h4>
      
      <div className="space-y-3">
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Enable Screen Reader</span>
          </div>
          <input
            type="checkbox"
            checked={settings.screenReader}
            onChange={toggleScreenReader}
            className="w-5 h-5 text-[#011F5B] rounded focus:ring-[#011F5B]"
          />
        </label>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Speech Rate</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-xs text-gray-500">{speechRate}x speed</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={speechVolume}
            onChange={(e) => setSpeechVolume(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-xs text-gray-500">Math.round(speechVolume * 100)%</span>
        </div>

        <div className="flex gap-2">
          <GradientButton
            gradient={gradients.primary}
            className="flex-1 flex items-center justify-center gap-2"
            onClick={readPageContent}
            disabled={isListening}
          >
            {isListening ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Reading...
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                Read Page
              </>
            )}
          </GradientButton>
          
          {isListening && (
            <button
              onClick={stopReading}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const NavigationControls = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
        <Keyboard className="w-4 h-4" />
        Navigation
      </h4>
      
      <div className="space-y-3">
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <Keyboard className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Keyboard Navigation</span>
          </div>
          <input
            type="checkbox"
            checked={settings.keyboardNavigation}
            onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
            className="w-5 h-5 text-[#011F5B] rounded focus:ring-[#011F5B]"
          />
        </label>
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-medium text-blue-800 mb-2">Keyboard Shortcuts</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li><kbd className="px-2 py-1 bg-blue-100 rounded">Tab</kbd> Navigate forward</li>
          <li><kbd className="px-2 py-1 bg-blue-100 rounded">Shift + Tab</kbd> Navigate backward</li>
          <li><kbd className="px-2 py-1 bg-blue-100 rounded">Enter</kbd> Activate element</li>
          <li><kbd className="px-2 py-1 bg-blue-100 rounded">Esc</kbd> Close modals</li>
          <li><kbd className="px-2 py-1 bg-blue-100 rounded">Alt + A</kbd> Open accessibility panel</li>
        </ul>
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Accessibility Settings</h2>
              <p className="text-gray-600">Customize your learning experience</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close accessibility panel"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <FontSizeControls />
          <VisualControls />
          <ScreenReaderControls />
          <NavigationControls />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <GradientButton
              gradient={gradients.secondary}
              className="flex-1"
              onClick={() => {
                // Reset to default settings
                setSettings({
                  fontSize: 'normal',
                  highContrast: false,
                  reducedMotion: false,
                  screenReader: false,
                  keyboardNavigation: false,
                  focusVisible: true,
                  darkMode: false,
                  colorBlindMode: 'none'
                })
              }}
            >
              Reset to Default
            </GradientButton>
            <GradientButton
              gradient={gradients.primary}
              className="flex-1"
              onClick={onClose}
            >
              Apply Settings
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessibilityPanel
