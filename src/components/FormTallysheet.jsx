import { useState } from "react";

function FormTallysheet() {
  const [form, setForm] = useState({
    namaKHG: "",
    namaPerusahaan: "",
    tahun: "",
    nomorTitik: "",
    tanggal: "",
    namaSurveyor: "",
    dusun: "",
    desa: "",
    kecamatan: "",
    kabupaten: "",
    latitude: "",
    arahLat: "LS",
    longitude: "",
    arahLong: "BT",
    elevasi: "",
    flora: "",
    fauna: "",
    sketsa: [],
    fotoTambahan: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, key) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, [key]: files }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL}/api/generate-tallysheet`,
        {
          method: "POST",
          body: formData,
        }
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Tallysheet_Gambut.docx";
      a.click();
    } catch (err) {
      alert("Gagal mengirim form. Periksa koneksi atau backend.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Form Tallysheet Gambut</h2>
      <input name="namaKHG" placeholder="Nama KHG" value={form.namaKHG} onChange={handleChange} />
      <input name="namaPerusahaan" placeholder="Nama Perusahaan" value={form.namaPerusahaan} onChange={handleChange} />
      <input name="tahun" placeholder="Tahun Pelaksanaan" value={form.tahun} onChange={handleChange} />
      <input name="nomorTitik" placeholder="Nomor Titik Survey" value={form.nomorTitik} onChange={handleChange} />
      <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} />
      <input name="namaSurveyor" placeholder="Nama Surveyor" value={form.namaSurveyor} onChange={handleChange} />
      <input name="dusun" placeholder="Dusun" value={form.dusun} onChange={handleChange} />
      <input name="desa" placeholder="Desa" value={form.desa} onChange={handleChange} />
      <input name="kecamatan" placeholder="Kecamatan" value={form.kecamatan} onChange={handleChange} />
      <input name="kabupaten" placeholder="Kabupaten" value={form.kabupaten} onChange={handleChange} />

      <div>
        <input name="latitude" placeholder="Latitude (misal: 02°12'28.58)" value={form.latitude} onChange={handleChange} />
        <select name="arahLat" value={form.arahLat} onChange={handleChange}>
          <option value="LS">LS</option>
          <option value="LU">LU</option>
        </select>
      </div>

      <div>
        <input name="longitude" placeholder="Longitude (misal: 110°12'15.39)" value={form.longitude} onChange={handleChange} />
        <select name="arahLong" value={form.arahLong} onChange={handleChange}>
          <option value="BT">BT</option>
          <option value="BB">BB</option>
        </select>
      </div>

      <input name="elevasi" placeholder="Elevasi Lahan (mdpl)" value={form.elevasi} onChange={handleChange} />
      <textarea name="flora" placeholder="Flora yang Dilindungi" value={form.flora} onChange={handleChange} />
      <textarea name="fauna" placeholder="Fauna yang Dilindungi" value={form.fauna} onChange={handleChange} />

      <label>Upload Sketsa Lokasi (foto)</label>
      <input type="file" multiple onChange={(e) => handleFileUpload(e, "sketsa")} />

      <label>Upload Foto Tambahan</label>
      <input type="file" multiple onChange={(e) => handleFileUpload(e, "fotoTambahan")} />

      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Kirim dan Unduh Word
      </button>
    </div>
  );
}

export default FormTallysheet;
