'use client'
import { useState } from 'react'
import api from '@/lib/api'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [state, setState] = useState('idle')
  const update = (event) => setForm((value) => ({ ...value, [event.target.name]:event.target.value }))
  const submit = async (event) => { event.preventDefault(); setState('sending'); try { await api.contact.create(form); setState('sent'); setForm({name:'',email:'',phone:'',subject:'',message:''}) } catch { setState('error') } }
  return <div className="contact-page section-pad">
    <header><p className="eyebrow">Begin a conversation</p><h1>Let&apos;s create<br /><em>something meaningful.</em></h1></header>
    <div className="contact-layout"><aside><p>Tell me about your site, ambition or early idea. I&apos;ll get back to you to discuss the right next step.</p><small>Email</small><a href="mailto:geocoenterprises@outlook.com">geocoenterprises@outlook.com</a><small>Phone</small><a href="tel:+923161588956">+92 316 1588956</a><small>Studio</small><span>I-14/3, Islamabad</span></aside>
      <form onSubmit={submit}><label><span>Your name</span><input required name="name" value={form.name} onChange={update} placeholder="Name" /></label><label><span>Email address</span><input required type="email" name="email" value={form.email} onChange={update} placeholder="Email" /></label><label><span>Phone</span><input name="phone" value={form.phone} onChange={update} placeholder="Phone (optional)" /></label><label><span>Project type</span><input required name="subject" value={form.subject} onChange={update} placeholder="Residential, commercial, interior..." /></label><label className="wide"><span>Tell me about your project</span><textarea required rows="5" name="message" value={form.message} onChange={update} placeholder="Location, scope, timeline and what you have in mind" /></label><button disabled={state==='sending'}>{state==='sending'?'Sending…':'Send enquiry'} <span>↗</span></button>{state==='sent'&&<p className="form-status">Thank you — your message has been received.</p>}{state==='error'&&<p className="form-status error">Message could not be sent. Please email directly.</p>}</form>
    </div>
  </div>
}
