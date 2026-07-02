'use client'
import LpHero from './LpHero'

interface Props {
  heroImage: string
  headline: string
  subheadline: string
  primaryCta: string
  secondaryCta: string
  trustPills: string[]
  whatsappNumber: string
  stickyCtaLabel: string
}

export default function LpClientWrapper(props: Props) {
  const scrollToCalc = () => {
    document.getElementById('lp-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openWhatsApp = () => {
    const msg = encodeURIComponent("Hi Parx Interiors! I'd like to book a free consultation for my home interior.")
    window.open(`https://wa.me/${props.whatsappNumber.replace(/\D/g, '')}?text=${msg}`, '_blank')
  }

  return (
    <LpHero
      heroImage={props.heroImage}
      headline={props.headline}
      subheadline={props.subheadline}
      primaryCta={props.primaryCta}
      secondaryCta={props.secondaryCta}
      trustPills={props.trustPills}
      onPrimaryClick={scrollToCalc}
      onSecondaryClick={openWhatsApp}
    />
  )
}
