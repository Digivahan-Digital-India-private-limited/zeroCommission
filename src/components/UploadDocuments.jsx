import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  FileText, CreditCard, DollarSign, Building, Briefcase, Car,
  Upload, CheckCircle2, X, Search, Lock, ChevronDown, ChevronUp, AlertCircle, User, ZoomIn, ChevronLeft, ChevronRight, Eye, Loader2, Download, ExternalLink, Printer
} from 'lucide-react'
import { sendApplicationOtp, verifyApplicationOtp, uploadDocuments, getDocuments } from '../services/loanService'

// Loan type → relevant doc category indices to highlight
const LOAN_DOC_MAP = {
  'Home Loan': [0, 1, 2],
  'Business Loan': [0, 1, 2],
  'Personal Loan': [0, 1],
  'Vehicle Loan': [0, 1],
  'Car Loan': [0, 1],
  'Education Loan': [0, 1],
  'Two-Wheeler Loan': [0, 1],
  'Medical Loan': [0, 1],
  'Travel Loan': [0, 1],
  'Loan Against Property': [0, 1, 2],
}

const DOC_CATEGORIES = [
  {
    label: 'Identity & Address Proof',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    docs: [
      { id: 'adharcard', name: 'Aadhaar Card', desc: 'Front & back sides', icon: CreditCard },
      { id: 'pancard', name: 'PAN Card', desc: 'Clear photo / scan', icon: CreditCard },
    ]
  },
  {
    label: 'Income & Financial Proof',
    color: '#0197E0',
    bg: 'rgba(1,151,224,0.08)',
    docs: [
      { id: 'salary_slips', name: 'Salary Slips', desc: 'Last 3 months', icon: DollarSign },
      { id: 'bank_statement', name: 'Bank Statement', desc: 'Last 6 months', icon: Building },
      { id: 'employment_letter', name: 'Employment Letter', desc: 'From current employer', icon: Briefcase },
    ]
  },
  {
    label: 'Business Documents',
    color: '#0155AD',
    bg: 'rgba(14,165,233,0.08)',
    docs: [
      { id: 'business_registration', name: 'Business Registration', desc: 'Certificate of Incorporation', icon: Building },
      { id: 'gst_returns', name: 'GST Returns', desc: 'Latest GST Returns', icon: FileText },
      { id: 'moa', name: 'MOA', desc: 'Memorandum of Association', icon: FileText },
    ]
  },
  {
    label: 'Other Documents',
    color: '#64748b',
    bg: 'rgba(100,116,139,0.08)',
    docs: [
      { id: 'otherdocs', name: 'Any Other Documents', desc: 'Upload any other relevant documents', icon: FileText },
    ]
  }
]

// ---- Upload Success Modal ----
function UploadSuccessModal({ onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,15,50,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
        style={{ animation: 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <style>{`@keyframes scaleIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
        <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #0197E0, #0155AD)' }} />
        <div className="px-8 pt-10 pb-8 text-center relative">
          <button onClick={onClose} className="absolute top-3 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100">
            <X size={16} />
          </button>
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="absolute w-20 h-20 rounded-full animate-ping opacity-20" style={{ background: '#0197E0' }} />
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #0197E0, #0155AD)' }}>
              <CheckCircle2 size={32} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="font-display font-black text-2xl mb-2" style={{ color: '#0f1857' }}>
            Documents Uploaded!
          </h2>
          <p className="text-gray-500 text-[15px] mb-6 leading-relaxed">
            Your documents have been <strong>successfully uploaded</strong>. Our team will review them and contact you within 24–48 hours.
          </p>
          <button onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #0197E0, #0155AD)', boxShadow: '0 10px 24px rgba(1,151,224,0.3)' }}>
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ---- File Preview Lightbox ----
function FilePreviewModal({ file, onClose }) {
  const isImage = file?.type?.startsWith('image/')
  const isPdf = file?.type === 'application/pdf'
  const [objectUrl, setObjectUrl] = useState(null)

  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setObjectUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  if (!file) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(5,10,40,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Close */}
      <button onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
        style={{ background: 'rgba(255,255,255,0.1)' }}>
        <X size={20} />
      </button>

      <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        {/* File name bar */}
        <div className="w-full flex items-center gap-3 mb-4 px-2">
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold truncate text-sm">{file.name}</p>
            <p className="text-white/50 text-xs">{(file.size / 1024).toFixed(0)} KB · {file.type || 'Unknown type'}</p>
          </div>
        </div>

        {/* Preview area */}
        <div className="w-full rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '75vh' }}>
          {isImage && objectUrl ? (
            <img src={objectUrl} alt={file.name}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl"
              style={{ animation: 'fadeInScale 0.3s ease' }} />
          ) : isPdf && objectUrl ? (
            <iframe src={objectUrl} title={file.name}
              className="w-full rounded-2xl"
              style={{ height: '75vh', border: 'none' }} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
                <FileText size={36} className="text-white/60" />
              </div>
              <p className="text-white/80 font-bold mb-1">{file.name}</p>
              <p className="text-white/40 text-sm">Preview not available for this file type.</p>
              <p className="text-white/30 text-xs mt-1">{file.type || 'Unknown format'}</p>
            </div>
          )}
        </div>
        <style>{`@keyframes fadeInScale { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }`}</style>
      </div>
    </div>,
    document.body
  )
}

// ---- Image Thumbnail component ----
function ImageThumb({ file, color, bg, onPreview, onRemove }) {
  const [src, setSrc] = useState(null)
  useEffect(() => {
    const url = URL.createObjectURL(file)
    setSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <div className="relative group/thumb flex-shrink-0" style={{ width: 72, height: 72 }}>
      {/* Thumbnail */}
      <button type="button" onClick={onPreview}
        className="w-full h-full rounded-xl overflow-hidden block"
        style={{ border: `2px solid ${color}50` }}>
        {src
          ? <img src={src} alt={file.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center" style={{ background: bg }}>
              <ZoomIn size={18} style={{ color }} />
            </div>
        }
        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200"
          style={{ background: 'rgba(0,0,0,0.45)' }}>
          <ZoomIn size={18} className="text-white" />
        </div>
      </button>
      {/* Remove X */}
      <button type="button" onClick={onRemove}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow-md opacity-100 lg:opacity-0 lg:group-hover/thumb:opacity-100 transition-opacity duration-200 z-10"
        style={{ background: '#ef4444', color: 'white' }}>
        <X size={10} strokeWidth={3} />
      </button>
      {/* File name tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        <div className="bg-gray-900 text-white text-[10px] rounded-lg px-2 py-1 whitespace-nowrap max-w-[120px] truncate shadow-xl">
          {file.name}
        </div>
      </div>
    </div>
  )
}

// ---- Main Upload Documents Page ----
export default function UploadDocuments({ appData }) {
  const [uploads, setUploads] = useState({}) // { docId: File[] }
  const [expanded, setExpanded] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [previewFile, setPreviewFile] = useState(null) // file being previewed
  const [previousDocs, setPreviousDocs] = useState([])  // already uploaded docs
  const [docsLoading, setDocsLoading] = useState(false)

  const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://zerocommission-backend.onrender.com' : 'http://localhost:5000')

  useEffect(() => {
    if (appData?.token) {
      fetchPreviousDocs(appData.token)
    }
  }, [appData?.token])

  const fetchPreviousDocs = async (token) => {
    setDocsLoading(true)
    try {
      const res = await getDocuments(token)
      setPreviousDocs(res.data?.documents || [])
    } catch (_) {
      setPreviousDocs([])
    } finally {
      setDocsLoading(false)
    }
  }

  const handleDownload = async (e, url, filename) => {
    e.stopPropagation()
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = blobUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(blobUrl)
      document.body.removeChild(a)
    } catch (err) {
      alert("Failed to download file")
    }
  }

  const handlePrint = async (e, url) => {
    e.stopPropagation()
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const isPdf = blob.type === 'application/pdf'

      if (isPdf) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = blobUrl
        document.body.appendChild(iframe)
        iframe.onload = () => {
          setTimeout(() => {
            iframe.contentWindow.focus()
            iframe.contentWindow.print()
            setTimeout(() => {
              document.body.removeChild(iframe)
              window.URL.revokeObjectURL(blobUrl)
            }, 5000)
          }, 500)
        }
      } else {
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head><title>Print Document</title></head>
              <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;">
                <img src="${blobUrl}" style="max-width:100%;max-height:100%;" onload="window.print(); setTimeout(function(){ window.close(); }, 500);" />
              </body>
            </html>
          `)
          printWindow.document.close()
        }
      }
    } catch (err) {
      console.error(err)
      alert("Failed to prepare document for printing. Please try viewing it instead.")
    }
  }



  // Merge new files with existing, avoid duplicate by name+size
  const handleFileChange = (docId, newFiles) => {
    setUploads(prev => {
      const existing = prev[docId] || []
      const incoming = Array.from(newFiles)
      const merged = [...existing]
      incoming.forEach(f => {
        if (!merged.find(e => e.name === f.name && e.size === f.size)) merged.push(f)
      })
      return { ...prev, [docId]: merged }
    })
  }

  // Remove a single file from a doc slot
  const removeFile = (docId, fileName) => {
    setUploads(prev => {
      const updated = (prev[docId] || []).filter(f => f.name !== fileName)
      return { ...prev, [docId]: updated }
    })
  }

  const totalUploaded = Object.values(uploads).filter(f => f && f.length > 0).length
  // Total file count across all docIds
  const totalFileCount = Object.values(uploads).reduce((acc, files) => acc + (files?.length || 0), 0)

  const handleSubmitAll = async () => {
    if (!appData?.loanApplicationId && !appData?.token) return
    setUploading(true)
    setUploadError('')
    try {
      const loanId = appData.loanApplicationId || appData.token
      await uploadDocuments(loanId, uploads)
      setShowSuccess(true)
      setUploads({})
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const toggleCategory = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  // Which categories are relevant for the verified loan type
  const relevantIndices = appData ? (LOAN_DOC_MAP[appData.loan] || [0, 1]) : []

  if (!appData) return null

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[860px] mx-auto px-6 md:px-10 relative z-10">
            {/* Verified Applicant Banner */}
            <div className="rounded-3xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4"
              style={{ background: 'linear-gradient(135deg, #f0fdf9, #eff6ff)', border: '1.5px solid #0197E0' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0197E0, #0155AD)' }}>
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-black text-lg" style={{ color: '#0f1857' }}>{appData.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(1,151,224,0.15)', color: '#0176C7' }}>✓ Token Verified</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>📱 {appData.phone}</span>
                  {appData.loan && <span>🏦 <strong style={{ color: '#1a237e' }}>{appData.loan}</strong></span>}
                </div>
              </div>
              <div className="text-right">
                <div className="font-black text-2xl tracking-widest" style={{ color: '#0f1857' }}>{appData.token}</div>
                <div className="text-xs text-gray-500">{totalUploaded} doc(s) selected</div>
              </div>
            </div>

            {/* Previously Uploaded Documents */}
            {previousDocs && previousDocs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 mb-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#1a237e] flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-[#0197E0]" /> Already Uploaded
                  </h3>
                  <span className="text-xs font-bold bg-blue-50 text-[#0155AD] px-3 py-1 rounded-lg">{previousDocs.length} file(s)</span>
                </div>
                {docsLoading ? (
                  <div className="flex justify-center py-4"><Loader2 className="animate-spin text-gray-400" /></div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {previousDocs.map((doc) => {
                      const fileUrl = `${BASE_URL}/${doc.path}`;
                      const isImg = doc.mimeType?.startsWith('image/');
                      return (
                        <div key={doc._id} 
                          onClick={() => window.open(fileUrl, '_blank')}
                          className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-blue-200 transition-all cursor-pointer shadow-sm">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {isImg ? <img src={fileUrl} alt={doc.docName} className="w-full h-full object-cover" /> : <FileText size={18} className="text-gray-400" />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-[#1a237e] truncate">{doc.docName}</p>
                              <p className="text-xs text-gray-400 truncate">{doc.originalName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={(e) => { e.stopPropagation(); window.open(fileUrl, '_blank'); }}
                              className="p-1.5 text-gray-500 hover:text-[#0176C7] bg-white rounded-md border border-gray-200 shadow-sm"
                              title="View">
                              <ExternalLink size={14} />
                            </button>
                            <button onClick={(e) => handleDownload(e, fileUrl, doc.originalName)}
                              className="p-1.5 text-gray-500 hover:text-blue-600 bg-white rounded-md border border-gray-200 shadow-sm"
                              title="Download">
                              <Download size={14} />
                            </button>
                            <button onClick={(e) => handlePrint(e, fileUrl)}
                              className="p-1.5 text-gray-500 hover:text-purple-600 bg-white rounded-md border border-gray-200 shadow-sm"
                              title="Print">
                              <Printer size={14} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Recommended Notice */}
            {appData.loan && (
              <div className="flex items-start gap-3 px-5 py-4 rounded-2xl mb-6"
                style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <AlertCircle size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-700">
                  Based on your <strong>{appData.loan}</strong> application, the highlighted categories below are <strong>recommended</strong>. You can still upload documents from other categories if needed.
                </p>
              </div>
            )}

            {/* Document Categories */}
            <div className="space-y-4 mb-8">
              {DOC_CATEGORIES.map((cat, catIdx) => {
                const isRelevant = relevantIndices.includes(catIdx)
                const uploadedInCat = cat.docs.filter(d => uploads[d.id]?.length > 0).length

                return (
                  <div key={catIdx} className="bg-white rounded-3xl overflow-hidden"
                    style={{
                      border: `1.5px solid ${isRelevant ? cat.color + '50' : 'rgba(26,35,126,0.07)'}`,
                      boxShadow: isRelevant ? `0 4px 24px ${cat.color}15` : '0 4px 16px rgba(0,0,0,0.04)'
                    }}>

                    {/* Category Header */}
                    <button onClick={() => toggleCategory(catIdx)}
                      className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50/50 transition-colors">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                      <span className="flex-1 text-left font-bold" style={{ color: '#0f1857' }}>{cat.label}</span>
                      <span className="text-xs text-gray-500 mr-2">{uploadedInCat}/{cat.docs.length}</span>
                      {expanded[catIdx] ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
                    </button>

                    {/* Document List */}
                    {expanded[catIdx] && (
                      <div className="px-6 pb-6 space-y-3">
                        <div className="h-px bg-gray-100 mb-4" />
                        {cat.docs.map((doc) => {
                          const DocIcon = doc.icon
                          const fileList = uploads[doc.id] || []
                          const hasFiles = fileList.length > 0
                          return (
                            <div key={doc.id} className="rounded-2xl overflow-hidden transition-all duration-200"
                              style={{
                                background: hasFiles ? cat.bg : '#fafafa',
                                border: `1.5px ${hasFiles ? 'solid' : 'dashed'} ${hasFiles ? cat.color : '#e5e7eb'}`,
                              }}>

                              {/* Doc row — clicking the label triggers file picker */}
                              <label htmlFor={`file-${doc.id}`}
                                className="flex items-center gap-4 p-4 cursor-pointer group">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                  style={{ background: cat.bg }}>
                                  <DocIcon size={18} style={{ color: cat.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm" style={{ color: '#0f1857' }}>{doc.name}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">{doc.desc}</div>
                                </div>
                                {/* Right action */}
                                <div className="flex-shrink-0 flex items-center gap-2">
                                  {hasFiles && <CheckCircle2 size={18} style={{ color: cat.color }} />}
                                  <span className="text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-200"
                                    style={hasFiles
                                      ? { color: cat.color, borderColor: cat.color, background: 'white' }
                                      : { color: '#9ca3af', borderColor: '#e5e7eb', background: 'white' }
                                    }>
                                    {hasFiles ? '+ Add More' : 'Browse'}
                                  </span>
                                </div>
                                <input id={`file-${doc.id}`} type="file" multiple
                                  accept="image/*,application/pdf,.doc,.docx"
                                  className="hidden"
                                  onChange={e => handleFileChange(doc.id, e.target.files)} />
                              </label>

                              {/* File preview area */}
                              {hasFiles && (
                                <div className="px-4 pb-4">
                                  {/* Image grid (if any images) */}
                                  {fileList.some(f => f.type.startsWith('image/')) && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      {fileList.filter(f => f.type.startsWith('image/')).map((file, fi) => (
                                        <ImageThumb key={fi} file={file} color={cat.color} bg={cat.bg}
                                          onPreview={() => setPreviewFile(file)}
                                          onRemove={() => removeFile(doc.id, file.name)} />
                                      ))}
                                    </div>
                                  )}
                                  {/* Non-image file chips */}
                                  <div className="flex flex-wrap gap-2">
                                    {fileList.filter(f => !f.type.startsWith('image/')).map((file, fi) => {
                                      const isPdf = file.type === 'application/pdf'
                                      const ext = file.name.split('.').pop().toUpperCase()
                                      const sizeKb = (file.size / 1024).toFixed(0)
                                      return (
                                        <div key={fi}
                                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer group/chip"
                                          style={{ background: 'white', border: `1px solid ${cat.color}40`, color: '#0f1857' }}>
                                          <span className="font-bold text-[10px] px-1.5 py-0.5 rounded"
                                            style={{ background: cat.bg, color: cat.color }}>
                                            {isPdf ? 'PDF' : ext}
                                          </span>
                                          <button type="button" onClick={() => setPreviewFile(file)}
                                            className="max-w-[120px] truncate hover:underline text-left">{file.name}</button>
                                          <span className="text-gray-500">{sizeKb}KB</span>
                                          <Eye size={12} className="text-gray-300 group-hover/chip:text-indigo-400 transition-colors" />
                                          <button type="button"
                                            onClick={e => { e.preventDefault(); removeFile(doc.id, file.name) }}
                                            className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors ml-1"
                                            style={{ color: '#f87171' }}>
                                            <X size={10} strokeWidth={2.5} />
                                          </button>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Upload Error Banner */}
            {uploadError && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-3.5 rounded-2xl text-sm font-medium mb-4">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span className="flex-1">{uploadError}</span>
                <button onClick={() => setUploadError('')} className="text-red-400 hover:text-red-600"><X size={14} /></button>
              </div>
            )}

            {/* Submit Button */}
            <div className="sticky bottom-6">
              <button onClick={handleSubmitAll}
                disabled={totalUploaded === 0 || uploading}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #0197E0, #0155AD)',
                  boxShadow: totalUploaded > 0 ? '0 16px 40px rgba(1,151,224,0.35)' : 'none',
                  transform: totalUploaded > 0 ? 'translateY(-2px)' : 'none'
                }}>
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Uploading {totalFileCount} file(s)...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload {totalFileCount > 0 ? `${totalFileCount} File(s) from ${totalUploaded} Category(ies)` : 'Documents'}
                  </>
                )}
              </button>
              {totalUploaded === 0 && appData && (
                <p className="text-center text-xs text-gray-500 mt-2">Select at least one document to upload</p>
              )}
            </div>
      </div>

      {showSuccess && <UploadSuccessModal onClose={() => setShowSuccess(false)} />}
      {previewFile && <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />}
    </div>
  )
}
