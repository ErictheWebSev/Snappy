document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('photo-canvas')
  const video = document.getElementById('video')
  const capturedPhoto = document.getElementById('captured-photo')
  const snapBtn = document.getElementById('snap-button')
  const downloadBtn = document.getElementById('download-button')
  
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream
    })
    .catch(error => {
      console.log('Error accessing camera', error)
    })
  } else {
    console.error('getUserMedia not supported in this browser');
}

snapBtn.addEventListener("click", () => {
  const ctx = canvas.getContext('2d')
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  ctx.drawImage(video, 0,0, canvas.width, canvas.height)
  
  capturedPhoto.src = canvas.toDataURL('image/png')
})

downloadBtn.addEventListener("click", () => {
  const photoUrl = capturedPhoto.src;
  const a = document.createElement('a')
  a.href = photoUrl
  a.download = 'Snappy_shot.png'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
})
  
})
