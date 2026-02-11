# IMPLEMENTATIONS_UPGRADESV5.md - Development Checklist

This document outlines the visual and structural redesign of the Spengo website.

## 1. THEME & COLOR SYSTEM
- [x] **Base Colors**
  - [x] Background: `#1a1a1a` (deep charcoal)
  - [x] Surface: `#242424` (lighter charcoal for cards)
  - [x] Text Primary: `#ffffff`
  - [x] Text Secondary: `#a0a0a0`
- [x] **Accent Options** (Choose during design approval)
  - [x] **Option A (Electric Purple):** `#a855f7`, Hover: `#9333ea`, Glow: `rgba(168, 85, 247, 0.5)`
  - [ ] **Option B (Lime Green):** `#84cc16`, Hover: `#65a30d`, Glow: `rgba(132, 204, 22, 0.5)`
  - [x] **Secondary Accent:** Cyan `#06b6d4`
- [x] **Typography**
  - [x] Maintain current font stack
  - [x] Ensure high contrast (WCAG AA)
  - [x] Line height: 1.6 (body), 1.2 (headings)

## 2. HERO SECTION
- [x] Redesign Headline for clarity (New copy: "We Make It Easy For Your Website Visitors To Convert")
- [x] Update body copy for stronger conversion focus
- [x] Improve readability and spacing (spread out feel)
- [x] Keep Badge as-is

## 3. PRICING SECTION REBUILD
- [x] **Removals**
  - [x] Delete 3 pricing cards (Starter, Growth, Scale)
  - [x] Delete "Standardized packages..." heading
  - [x] Delete "Service Plans" label
- [x] **New "How It Works" Structure**
  - [x] Heading: "How It Works - Simple & Transparent"
  - [x] Layout: Single column, center-aligned (max-width 800px)
  - [x] **Step Cards (01-04)**
    - [x] 01: You Submit Your Site (2 mins, no credit card)
    - [x] 02: We Audit Everything (Identify bottlenecks, 48 hours)
    - [x] 03: You Get A Clear Plan (Broken bits, fix list, costs)
    - [x] 04: You Decide (Build it or walk away with the audit)
  - [x] **Pricing Note:** "Most projects range from $500 - $1,500" text below cards
  - [x] **Design:** Large accent step numbers (48px+), `#242424` background, hover lift
  - [x] **CTA:** "Start Your Free Audit" button

## 4. NEW SECTION: BEFORE & AFTER
- [x] Placement: Between "Process" and Contact Form
- [x] **Layout**
  - [x] Desktop: 3 columns
  - [x] Mobile: 1 column
- [x] **Comparison Cards (3 total)**
  - [x] Visual implementation (choose during design phase: Slider, Hover, or Cross-fade)
  - [x] Before State: Blur/Grayscale/Skeleton
  - [x] After State: Crisp/Full Color
  - [x] Metrics below: Load Time (3.5s → 0.8s), Bounce Rate (45% → 18%)
- [x] Provide 2-3 design concepts for approval

## 5. BUTTON STANDARDIZATION
- [x] **New Text**
  - [x] Primary: "Start Your Free Audit"
  - [x] Secondary: "Get Your Audit"
- [x] **Locations to Update/Add**
  - [x] Hero Section
  - [x] After "Cost of slow first impression" (New)
  - [x] After "Pricing/Process" (New)
  - [x] Bottom with Contact Form
  - [x] Navigation "Free Audit"
- [x] **Styling**
  - [x] Primary: Solid accent, 16px/32px padding, shadow transition
  - [x] Secondary: Transparent, accent border, hover fill

## 6. CONTACT FORM UPDATES
- [x] **Placeholder Text**
  - [x] "Your name"
  - [x] "Where should we send your audit?"
  - [x] "Your website URL"
  - [x] "What's frustrating you about your current site?"
- [x] **Credibility Text**
  - [x] Add italic text about AI/Optimization experience (14px, #a0a0a0)
- [x] **Submit Button**
  - [x] Update text to "Start Your Free Audit"
  - [x] Apply primary button styling

## 7. RISK REVERSAL SECTION
- [x] Placement: Bottom of page (above final form/footer)
- [x] Content: "Zero Risk, All Reward" + performance guarantee text
- [x] Design: Center-aligned, `#242424` background, 64px padding

## 8. EXISTING SECTION UPDATES
- [x] **"How it works in 4 steps"**
  - [x] Update Step 02 to: "You'll receive a detailed scope and custom pricing..."
- [x] **"Cost of slow first impression"**
  - [x] Add CTA below: "Start Your Free Audit"

## 9. ANIMATIONS & MICRO-INTERACTIONS
- [x] Button Hover States (TranslateY, box-shadow)
- [x] Card Hover States (TranslateY, shadow)
- [x] Form Input Focus (Accent border, glow)
- [x] Link Hover (Underline slide-in)
- [x] Scroll-triggered Fade-ins (Intersection Observer)
- [x] Background Grid Animation (Subtle animated linear-gradients)
- [x] Speed Visualization (Counting animations for metrics)
- [x] Before/After Interaction (Implement approved option)

## 10. PERFORMANCE & TECHNICAL
- [x] Target Load Time: < 1 second
- [x] Minify CSS/JS & Compress Images (WebP)
- [x] Maintain 60fps animations
- [x] JS Bundle Budget: < 100kb (gzipped)
- [x] Responsive Breakpoints (sm, md, lg, xl)
- [x] Browser Compatibility (Last 2 versions of Chrome, Safari, Firefox, Edge)
- [x] Analytics Events (CTA clicks, Form submits, Scroll depth, Interaction)
- [x] Accessibility (WCAG 2.1 AA, Lighthouse > 90)

## 11. DELIVERABLES (PRE-BUILD)
- [x] Phase 1: Color Palette Examples (Purple vs Lime)
- [x] Phase 1: Before/After Section Concepts (Slider vs Hover vs Cross-fade)
- [x] Phase 1: Pricing Process Layout (Desktop/Mobile)

---
*Created on 2026-02-10 - Based on Spengo Website Redesign Development Brief*
