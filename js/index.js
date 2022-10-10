import Generate from './generate'

document.addEventListener('DOMContentLoaded', () => {
  const generateInstance = new Generate()
  const generateButton = document.getElementById('generate')

  generateButton.addEventListener('click', e => {
    e.preventDefault()
    const bodyCopySize = 11
    const titleSize = 16

    // Create an A5 pdf
    let doc = new PDFDocument({
      size: 'A5',
      bufferPages: true
    })
    let stream = doc.pipe(blobStream())

    // STRUCTURE
    // 1. Create title
    // 2. Create chapters
    // // a. For each chapter, have x-x amount of words
    // // b. Create a chapter title
    // 3. Render title on first page
    // 4. For each chapter, add a chapter title page, and then all the text for that chapter
    // 5. When at end, add a 'The End' page
    // 6. Now that we know all the pages, go create a table of contents (Optional/low priority)
    // 7. Go through each page and add page numbers

    // START STRUCTURE OBJECT
    const title = generateInstance.titleize(generateInstance.createSentence(6, 1, true).trim())

    const bookData = {
      title: title,
      chapters: []
    }

    const chaptersNum = Math.floor(Math.random() * (20 - 5 + 1) + 5) // make between 5-12 chapters

    for (let index = 0; index < chaptersNum; index++) {
      const paragraphsNum = Math.floor(Math.random() * (40 - 1 + 1) + 1) // make between 1-40 paragraphs

      const obj = {
        title: generateInstance.titleize(generateInstance.createSentence(7, 1, true).trim()),
        paragraphs: generateInstance.createParagraphs(paragraphsNum)
      }

      bookData.chapters.push(obj)
    }

    console.log(bookData)

    // add title page
    doc.font('Times-Roman')
    doc.fontSize(titleSize) // set font size
    doc.text(bookData.title, { // Add title page
      align: 'center'
    })
    doc.moveDown(5)
    doc.fontSize(bodyCopySize)
    // doc.text('A book', {
    //   align: 'center'
    // })
    // doc.moveDown(1)
    const today = new Date()
    doc.text(`A book published ${today.toLocaleDateString()}`, {
      align: 'center'
    })

    // start adding paragraphs
    bookData.chapters.forEach((chapter, index) => {
      doc.addPage()
      doc.fontSize(titleSize)
      doc.text(index + 1, {
        align: 'center'
      })
      doc.moveDown()
      doc.text(chapter.title, {
        align: 'center'
      })

      doc.moveDown(6)
      doc.fontSize(bodyCopySize)

      doc.text(chapter.paragraphs, {
        align: 'left'
      })
    })

    // add page numbers
    const range = doc.bufferedPageRange()

    for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
      if (i > 0) {
        doc.switchToPage(i);
        doc.text(i + 1, 72, 10, {
          align: 'center'
        });
      }
    }

    // // End and put pdf in a new tab
    doc.end();
    stream.on('finish', function() {
      window.open(stream.toBlobURL('application/pdf'), '_blank')
    });
  })
})