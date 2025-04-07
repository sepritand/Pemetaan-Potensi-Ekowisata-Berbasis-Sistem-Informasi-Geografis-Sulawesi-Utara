// js/map.js
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi peta
  const map = L.map('map').setView([1.25, 124.8], 9); // Titik tengah Sulawesi Utara

  // Gunakan tile dari OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Ambil data dari JSON
  fetch('data/ekowisata.json')
    .then(response => {
      if (!response.ok) throw new Error("Gagal mengambil data ekowisata.json");
      return response.json();
    })
    .then(ekowisataData => {
      ekowisataData.forEach(spot => {
        const marker = L.marker([spot.latitude, spot.longitude]).addTo(map);

        const imagePath = `images/${spot.gambar}`;
        const googleMapsLink = spot.gmaps || `https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`;

        const popupContent = `
          <div style="width:200px;">
            <h4>${spot.nama}</h4>
            <img 
              src="${imagePath}" 
              alt="${spot.nama}" 
              width="100%" 
              onerror="this.onerror=null;this.src='images/default.jpg';" 
              style="border-radius:8px; box-shadow:0 0 6px rgba(0,0,0,0.15);" 
            />
            <p><strong>Lokasi:</strong> ${spot.lokasi}</p>
            <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px;">
              <a href="detail.html?id=${spot.id}" class="btn" style="text-align:center;">
                Lihat Detail
              </a>
              <a href="${googleMapsLink}" target="_blank" class="btn" 
                 style="background-color:#4285F4; color:white; text-align:center;">
                Buka di Google Maps
              </a>
            </div>
          </div>
        `;
        marker.bindPopup(popupContent);
      });
    })
    .catch(error => {
      console.error("Terjadi kesalahan saat memuat data:", error);
    });
});
