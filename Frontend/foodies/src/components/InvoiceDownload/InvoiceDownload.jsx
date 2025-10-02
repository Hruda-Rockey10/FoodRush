import React from 'react';
import jsPDF from 'jspdf';
import Logo from '../../assets/logo.png?url'; // ensure ?url is used if your build supports it

const InvoiceDownload = ({ cartItems, subtotal, tax, shipping, total }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = Logo;

    img.onload = () => {
      // Add Logo
      doc.addImage(img, 'PNG', 85, 10, 40, 20); // Centered

      // Header
      doc.setFontSize(18);
      doc.setTextColor(218, 165, 32); // Gold
      doc.text('Foodies Gourmet Invoice', 105, 35, null, null, 'center');

      doc.setDrawColor(218, 165, 32);
      doc.line(20, 40, 190, 40);

      // Invoice Info
      doc.setFontSize(11);
      doc.setTextColor(80);
      const date = new Date().toLocaleDateString();
      doc.text(`Date: ${date}`, 20, 48);
      doc.text('Invoice No: #' + Math.floor(100000 + Math.random() * 900000), 140, 48);

      // Table Header
      let y = 60;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0);
      doc.text('No.', 20, y);
      doc.text('Item', 30, y);
      doc.text('Qty', 120, y);
      doc.text('Unit Price', 140, y);
      doc.text('Total', 170, y);
      doc.line(20, y + 2, 190, y + 2);

      // Table Content
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      cartItems.forEach((item, index) => {
        const totalPrice = item.quantity * item.price;
        doc.text(`${index + 1}`, 20, y);
        doc.text(item.name, 30, y);
        doc.text(`${item.quantity}`, 123, y);
        doc.text(`₹${item.price.toFixed(2)}`, 140, y);
        doc.text(`₹${totalPrice.toFixed(2)}`, 170, y);
        y += 8;
      });

      // Summary
      y += 5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Summary:', 20, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text(`Subtotal:`, 140, y);
      doc.text(`₹${subtotal.toFixed(2)}`, 170, y, { align: 'right' }); y += 7;

      doc.text(`Tax (10%):`, 140, y);
      doc.text(`₹${tax.toFixed(2)}`, 170, y, { align: 'right' }); y += 7;

      doc.text(`Shipping:`, 140, y);
      doc.text(`₹${shipping.toFixed(2)}`, 170, y, { align: 'right' }); y += 7;

      doc.setFont('helvetica', 'bold');
      doc.text(`Total:`, 140, y);
      doc.text(`₹${total.toFixed(2)}`, 170, y, { align: 'right' }); y += 10;

      // Footer
      doc.setDrawColor(180);
      doc.line(20, y, 190, y); y += 8;

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont('helvetica', 'italic');
      doc.text('Thank you for dining with Foodies! We hope to see you again soon.', 105, y, null, null, 'center');

      // Save
      doc.save('invoice.pdf');
    };
  };

  return (
    <button className="btn custom-gold-btn mt-3 w-100" onClick={handleDownload}>
      <i className="bi bi-download me-2"></i>Download PDF Invoice
    </button>
  );
};

export default InvoiceDownload;
