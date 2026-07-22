import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Turisto team. We\'re here to help plan your next trip.',
}

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <h1 className="text-2xl font-semibold md:text-3xl">Get in touch</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Questions about a tour or your booking? We&apos;d love to hear from you.</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div><h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3><p>hello@turisto.com</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-gray-100">Phone</h3><p>+1 (555) 123-4567</p></div>
            <div><h3 className="font-semibold text-gray-900 dark:text-gray-100">Office</h3><p>123 Wanderlust Ave, Explorer City</p></div>
          </div>
          <ContactForm />
        </div>
      </Container>
    </Section>
  )
}
