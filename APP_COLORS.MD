# App Color System

This document defines the EXACT colors used throughout the Aura app. All screens MUST use these colors from `AppColors.swift`.

## Background Colors

- **Primary Background**: `#000000` at 98% opacity - Used for all main screen backgrounds
- **Card Background (Light)**: `#F8F8F8` - Used for cards, buttons, elevated surfaces
- **Card Background (Dark)**: `#1A1A1A` - Used for dark mode cards or elevated dark surfaces

## Text Colors

- **Text Primary**: White (`Color.white`) - Main headings, important text
- **Text Secondary**: White at 70% opacity - Body text, descriptions
- **Text Tertiary**: White at 50% opacity - Captions, meta text, footer links

- **Text Dark**: Black (`Color.black`) - Text on light backgrounds
- **Text Dark Secondary**: Black at 70% opacity - Secondary text on light backgrounds

## Accent Colors

- **Accent Blue**: `hue: 0.52, saturation: 1.0, brightness: 0.88` - Primary accent, CTAs, selected states
- **Accent Purple**: `#9370DB` - Secondary accent for variety

## Border & Divider Colors

- **Border**: White at 10% opacity - Card borders, input borders
- **Border Light**: Black at 10% opacity - Borders on light backgrounds
- **Divider**: White at 8% opacity - Section dividers, hairlines

## Button Colors

- **Button Text**: Black - Text on light buttons
- **Button Background**: `#F8F8F8` - Standard button background

## Usage Rules

1. **NEVER** hardcode colors in screen files
2. **ALWAYS** import and use `AppColors.swift`
3. **NO** random hex codes or Color literals in views
4. **USE** semantic names (e.g., `AppColors.textPrimary` not `Color.white`)
5. **CONSISTENT** opacity levels - use predefined values from `Tokens.Opacity`

## Examples

### ✅ CORRECT
```swift
Text("Hello")
    .foregroundStyle(AppColors.textPrimary)
    
RoundedRectangle(cornerRadius: Tokens.Radius.card)
    .fill(AppColors.cardBackground)
```

### ❌ WRONG
```swift
Text("Hello")
    .foregroundStyle(.white)
    
RoundedRectangle(cornerRadius: 20)
    .fill(Color(hex: "#F8F8F8"))
```

## Color Palette Reference

```
Background:     #000000 (98%)
Card Light:     #F8F8F8
Card Dark:      #1A1A1A
Accent Blue:    HSB(0.52, 1.0, 0.88)
Accent Purple:  #9370DB
Text Primary:   #FFFFFF
Text Secondary: #FFFFFF (70%)
Text Tertiary:  #FFFFFF (50%)
Border:         #FFFFFF (10%)
Divider:        #FFFFFF (8%)
```

## Updating Colors

To change a color across the entire app:
1. Update the value in `AppColors.swift`
2. The change will propagate to all screens automatically
3. Test on all major screens to verify consistency

