import React from 'react'

// Gradient style definitions for consistent theming across the app
export const gradients = {
  primary: 'from-[#011F5B] to-[#00416A]',
  secondary: 'from-[#FF6B35] to-[#FF8C61]',
  accent: 'from-[#00416A] to-[#FF6B35]',
  success: 'from-[#10B981] to-[#059669]',
  warning: 'from-[#F59E0B] to-[#D97706]',
  error: 'from-[#EF4444] to-[#DC2626]',
  info: 'from-[#3B82F6] to-[#2563EB]',
  purple: 'from-[#8B5CF6] to-[#7C3AED]',
  dark: 'from-[#1F2937] to-[#111827]',
  light: 'from-[#F9FAFB] to-[#F3F4F6]'
}

export const gradientClasses = {
  // Background gradients
  bgPrimary: `bg-gradient-to-r ${gradients.primary}`,
  bgSecondary: `bg-gradient-to-r ${gradients.secondary}`,
  bgAccent: `bg-gradient-to-r ${gradients.accent}`,
  bgSuccess: `bg-gradient-to-r ${gradients.success}`,
  bgWarning: `bg-gradient-to-r ${gradients.warning}`,
  bgError: `bg-gradient-to-r ${gradients.error}`,
  bgInfo: `bg-gradient-to-r ${gradients.info}`,
  bgPurple: `bg-gradient-to-r ${gradients.purple}`,
  bgDark: `bg-gradient-to-r ${gradients.dark}`,
  bgLight: `bg-gradient-to-r ${gradients.light}`,

  // Text gradients
  textPrimary: `bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`,
  textSecondary: `bg-gradient-to-r ${gradients.secondary} bg-clip-text text-transparent`,
  textAccent: `bg-gradient-to-r ${gradients.accent} bg-clip-text text-transparent`,
  textSuccess: `bg-gradient-to-r ${gradients.success} bg-clip-text text-transparent`,
  textWarning: `bg-gradient-to-r ${gradients.warning} bg-clip-text text-transparent`,
  textError: `bg-gradient-to-r ${gradients.error} bg-clip-text text-transparent`,
  textInfo: `bg-gradient-to-r ${gradients.info} bg-clip-text text-transparent`,
  textPurple: `bg-gradient-to-r ${gradients.purple} bg-clip-text text-transparent`
}

// Gradient border utility
export const GradientBorder = ({ children, className = '', gradient = gradients.primary, thickness = '2px' }) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        background: `linear-gradient(${gradient}, ${gradient})`,
        padding: thickness
      }}
    >
      <div className="bg-white w-full h-full">
        {children}
      </div>
    </div>
  )
}

// Gradient card component
export const GradientCard = ({ 
  children, 
  className = '', 
  gradient = gradients.primary,
  hover = true,
  padding = 'p-6'
}) => {
  return (
    <div 
      className={`bg-gradient-to-br ${gradient} rounded-xl shadow-lg ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''} ${padding} ${className}`}
    >
      {children}
    </div>
  )
}

// Gradient button component
export const GradientButton = ({ 
  children, 
  className = '', 
  gradient = gradients.secondary,
  size = 'md',
  disabled = false,
  ...props 
}) => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }

  return (
    <button
      className={`bg-gradient-to-r ${gradient} text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Gradient text component
export const GradientText = ({ children, className = '', gradient = gradients.primary, as: Component = 'span' }) => {
  return (
    <Component className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold ${className}`}>
      {children}
    </Component>
  )
}

// Animated gradient background
export const AnimatedGradient = ({ children, className = '', speed = 'slow' }) => {
  const speeds = {
    slow: 'animate-gradient-slow',
    medium: 'animate-gradient-medium',
    fast: 'animate-gradient-fast'
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients.primary} ${gradients.secondary} ${gradients.accent} bg-[length:200%_200%] ${speeds[speed]}`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Glass morphism with gradient
export const GlassCard = ({ children, className = '', blur = 'md' }) => {
  const blurs = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  }

  return (
    <div className={`bg-white/10 ${blurs[blur]} border border-white/20 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  )
}

// Custom hooks for gradient utilities
export const useGradient = () => {
  return {
    gradients,
    classes: gradientClasses,
    GradientBorder,
    GradientCard,
    GradientButton,
    GradientText,
    AnimatedGradient,
    GlassCard
  }
}

export default {
  gradients,
  gradientClasses,
  GradientBorder,
  GradientCard,
  GradientButton,
  GradientText,
  AnimatedGradient,
  GlassCard,
  useGradient
}
