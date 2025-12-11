import React, { useState, useRef } from 'react'
import { Download, FileText, Receipt, CheckCircle, AlertCircle, Clock, User, Calendar, DollarSign, Eye, Printer, Share2, Mail } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../common/GradientStyles'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const DocumentGenerator = ({ documentType = 'clearance', studentData = {} }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewMode, setPreviewMode] = useState('preview')
  const clearanceRef = useRef(null)
  const receiptRef = useRef(null)

  const sampleStudentData = {
    name: 'Alex Johnson',
    id: 'STU2025001',
    grade: '10th Grade',
    section: 'A',
    academicYear: '2024-2025',
    guardian: 'Sarah Johnson',
    guardianContact: '+1 (555) 123-4567',
    address: '123 Learning Street, Education City, EC 12345'
  }

  const sampleClearanceData = {
    library: { status: 'cleared', officer: 'Ms. Smith', date: '2025-06-10' },
    laboratory: { status: 'cleared', officer: 'Dr. Brown', date: '2025-06-11' },
    sports: { status: 'cleared', officer: 'Mr. Davis', date: '2025-06-12' },
    accounts: { status: 'pending', officer: 'Ms. Wilson', date: '-' },
    guidance: { status: 'cleared', officer: 'Dr. Johnson', date: '2025-06-09' }
  }

  const sampleReceiptData = {
    receiptNumber: 'RCP-2025-001234',
    date: '2025-06-15',
    paymentMethod: 'Credit Card',
    items: [
      { description: 'Tuition Fee - June 2025', amount: 2500.00 },
      { description: 'Laboratory Fees', amount: 150.00 },
      { description: 'Library Services', amount: 50.00 },
      { description: 'Sports Activities', amount: 75.00 },
      { description: 'Technology Fee', amount: 100.00 }
    ],
    subtotal: 2875.00,
    tax: 0.00,
    total: 2875.00,
    paidAmount: 2875.00,
    balance: 0.00
  }

  const generatePDF = async (elementRef, filename) => {
    setIsGenerating(true)
    try {
      const element = elementRef.current
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(filename)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const ClearanceForm = () => (
    <div ref={clearanceRef} className="bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">STUDENT CLEARANCE FORM</h1>
        <p className="text-gray-600">Academic Year 2024-2025</p>
      </div>

      {/* Student Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Student Information
        </h2>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Full Name:</p>
            <p className="font-medium">{sampleStudentData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Student ID:</p>
            <p className="font-medium">{sampleStudentData.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Grade & Section:</p>
            <p className="font-medium">{sampleStudentData.grade} - {sampleStudentData.section}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Guardian:</p>
            <p className="font-medium">{sampleStudentData.guardian}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Address:</p>
            <p className="font-medium">{sampleStudentData.address}</p>
          </div>
        </div>
      </div>

      {/* Department Clearances */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Department Clearances</h2>
        <div className="space-y-3">
          {Object.entries(sampleClearanceData).map(([dept, data]) => (
            <div key={dept} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                {data.status === 'cleared' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <p className="font-medium capitalize">{dept}</p>
                  <p className="text-sm text-gray-600">Clearing Officer: {data.officer}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${data.status === 'cleared' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {data.status.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">{data.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-12 space-y-8">
        <div className="border-t border-gray-300 pt-4">
          <p className="text-sm text-gray-600 mb-2">Student Signature:</p>
          <div className="h-12 border-b border-gray-400"></div>
          <p className="text-sm text-gray-500 mt-1">Date: _________________</p>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <p className="text-sm text-gray-600 mb-2">Parent/Guardian Signature:</p>
          <div className="h-12 border-b border-gray-400"></div>
          <p className="text-sm text-gray-500 mt-1">Date: _________________</p>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <p className="text-sm text-gray-600 mb-2">School Administrator:</p>
          <div className="h-12 border-b border-gray-400"></div>
          <p className="text-sm text-gray-500 mt-1">Date: _________________</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
        <p>EduConnect Learning Center</p>
        <p>123 Education Street, Learning City, EC 12345</p>
        <p>+1 (555) 123-4567 | support@educonnect.com</p>
      </div>
    </div>
  )

  const PaymentReceipt = () => (
    <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">PAYMENT RECEIPT</h1>
        <p className="text-gray-600">Official Receipt</p>
      </div>

      {/* Receipt Info */}
      <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="text-sm text-gray-600">Receipt Number:</p>
          <p className="font-medium">{sampleReceiptData.receiptNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Date:</p>
          <p className="font-medium">{sampleReceiptData.date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Payment Method:</p>
          <p className="font-medium">{sampleReceiptData.paymentMethod}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Student ID:</p>
          <p className="font-medium">{sampleStudentData.id}</p>
        </div>
      </div>

      {/* Student Info */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Billed To:</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium">{sampleStudentData.name}</p>
          <p className="text-gray-600">{sampleStudentData.grade} - {sampleStudentData.section}</p>
          <p className="text-gray-600">{sampleStudentData.address}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Payment Details:</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sampleReceiptData.items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold">Subtotal:</td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                ${sampleReceiptData.subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Tax:</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                ${sampleReceiptData.tax.toFixed(2)}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold">Total:</td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                ${sampleReceiptData.total.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Paid Amount:</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                ${sampleReceiptData.paidAmount.toFixed(2)}
              </td>
            </tr>
            <tr className="bg-green-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-green-700">Balance:</td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold text-green-700">
                ${sampleReceiptData.balance.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Status */}
      <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Payment Status: PAID IN FULL</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
        <p>Thank you for your payment!</p>
        <p>EduConnect Learning Center</p>
        <p>123 Education Street, Learning City, EC 12345</p>
        <p>+1 (555) 123-4567 | support@educonnect.com</p>
      </div>
    </div>
  )

  const DocumentPreview = () => {
    if (previewMode === 'preview') {
      return documentType === 'clearance' ? <ClearanceForm /> : <PaymentReceipt />
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {documentType === 'clearance' ? 'Clearance Form' : 'Payment Receipt'}
          </h2>
          <p className="text-gray-600">Generate and download official documents</p>
        </div>
        <div className="flex gap-2">
          <GradientButton
            gradient={gradients.primary}
            className="flex items-center gap-2"
            onClick={() => setPreviewMode(previewMode === 'preview' ? 'edit' : 'preview')}
          >
            <Eye className="w-4 h-4" />
            {previewMode === 'preview' ? 'Edit' : 'Preview'}
          </GradientButton>
          <GradientButton
            gradient={gradients.secondary}
            className="flex items-center gap-2"
            onClick={() => generatePDF(
              documentType === 'clearance' ? clearanceRef : receiptRef,
              `${documentType === 'clearance' ? 'clearance-form' : 'payment-receipt'}-${sampleStudentData.id}.pdf`
            )}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PDF
              </>
            )}
          </GradientButton>
        </div>
      </div>

      {/* Document Preview */}
      <GradientCard gradient={gradients.light} className="p-6">
        <div className="overflow-auto max-h-[800px]">
          <DocumentPreview />
        </div>
      </GradientCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <Printer className="w-6 h-6 text-[#011F5B]" />
          <span className="text-sm text-gray-700">Print</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <Mail className="w-6 h-6 text-[#011F5B]" />
          <span className="text-sm text-gray-700">Email</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <Share2 className="w-6 h-6 text-[#011F5B]" />
          <span className="text-sm text-gray-700">Share</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <FileText className="w-6 h-6 text-[#011F5B]" />
          <span className="text-sm text-gray-700">History</span>
        </button>
      </div>
    </div>
  )
}

export default DocumentGenerator
