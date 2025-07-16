/* App.css template tetap. Ini update FormTallysheet.jsx, silakan masukkan ke src/components/FormTallysheet.jsx */

import React, { useState } from "react";
import axios from "axios";

function FormTallysheet() {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = (e, name) => {
    setFiles({ ...files, [name]: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    Object.entries(files).forEach(([key, valueArr]) => valueArr.forEach((file, idx) => data.append(`${key}_${idx + 1}`, file)));
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/generate-tallysheet`,
        data,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Tallysheet-Gambut.docx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim form. Periksa koneksi atau backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>A. FORMULIR TALLYSHEET</h2>
      <input name="namaKHG" placeholder="Nama KHG" onChange={handleChange} />
<input name="namaPerusahaan" placeholder="Nama Perusahaan" onChange={handleChange} />
<input name="tahunPelaksanaan" placeholder="Tahun Pelaksanaan" onChange={handleChange} />
<input name="nomorTitikSurvey" placeholder="Nomor Titik Survey" onChange={handleChange} />
<input name="hariTanggal" placeholder="Hari/Tanggal" onChange={handleChange} />
<input name="namaSurveyor" placeholder="Nama Surveyor" onChange={handleChange} />
<input name="dusun" placeholder="Dusun" onChange={handleChange} />
<input name="desa" placeholder="Desa" onChange={handleChange} />
<input name="kecamatan" placeholder="Kecamatan" onChange={handleChange} />
<input name="kabupaten" placeholder="Kabupaten" onChange={handleChange} />
<label>Koordinat Latitude (LS/LU)</label>
<input name="koordinatLatitudeDerajat" placeholder="Derajat" type="number" onChange={handleChange} />
<input name="koordinatLatitudeMenit" placeholder="Menit" type="number" onChange={handleChange} />
<input name="koordinatLatitudeDetik" placeholder="Detik" type="number" onChange={handleChange} />
<label>Koordinat Longitude (BT/BB)</label>
<input name="koordinatLongitudeDerajat" placeholder="Derajat" type="number" onChange={handleChange} />
<input name="koordinatLongitudeMenit" placeholder="Menit" type="number" onChange={handleChange} />
<input name="koordinatLongitudeDetik" placeholder="Detik" type="number" onChange={handleChange} />
<input name="elevasiLahan" placeholder="Elevasi Lahan (mdpl)" onChange={handleChange} />
<input name="kedalamanAirTanah" placeholder="Kedalaman Air Tanah / TMAT / Genangan / Banjir" onChange={handleChange} />
<input name="tutupanPenggunaanLahan" placeholder="Tutupan Lahan / Penggunaan Lahan / Kondisinya" onChange={handleChange} />
<input name="floraFaunaDilindungi" placeholder="Keberadaan Flora dan Fauna Dilindungi" onChange={handleChange} />
<input name="kondisiDrainaseAlami" placeholder="Kondisi Drainase Alami" onChange={handleChange} />
<input name="kondisiDrainaseBuatan" placeholder="Kondisi Drainase Buatan" onChange={handleChange} />
<input name="kualitasAirKanal" placeholder="Kualitas Air Kanal (µS, ppm, pH)" onChange={handleChange} />
<input name="karakteristikSubstratum" placeholder="Karakteristik Substratum Tanah Liat (Bahan Induk)" onChange={handleChange} />
<input name="tipeLuapan" placeholder="Tipe Luapan Musim Kemarau dan Hujan" onChange={handleChange} />
<input name="ketebalanGambut" placeholder="Ketebalan Gambut (cm)" onChange={handleChange} />
<input name="substratumBawahGambut" placeholder="Karakteristik Substratum di Bawah Lapisan Gambut" onChange={handleChange} />
<input name="perkembanganKerusakan" placeholder="Perkembangan Kondisi atau Tingkat Kerusakan Lahan Gambut" onChange={handleChange} />
<input name="informasiKebakaran" placeholder="Informasi Kejadian Kebakaran Lahan dan Hari Hujan" onChange={handleChange} />
<input name="porositasBobotIsi" placeholder="Porositas (Bobot Isi) (%)" onChange={handleChange} />
<input name="kelengasanKadarAir" placeholder="Kelengasan (Kadar Air) (%)" onChange={handleChange} />
<input name="cOrganik" placeholder="C-Organik (%)" onChange={handleChange} />
      {/* Lengkapi input lainnya seperti sebelumnya */}

      <h2>B. FOTO LAPANGAN</h2>
      <p><em>Seluruh hasil foto yang diambil harus jelas dan tidak membelakangi matahari</em></p>
      <label>1. Air tanah, genangan atau banjir</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "airTanahGenangan")}/>
      <label>2. Tutupan lahan, penggunaan lahan dan kondisinya</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "tutupanLahan")}/>
      <label>3. Keberadaan flora dan fauna yang dilindungi</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "floraFauna")}/>
      <label>4. Drainase alami</label>
      <input type="file" onChange={(e) => handleUpload(e, "drainaseAlami")}/>
      <label>4. Drainase buatan</label>
      <input type="file" onChange={(e) => handleUpload(e, "drainaseBuatan")}/>
      <label>5. Kualitas Air/Kondisi Air Kanal - EC</label>
      <input type="file" onChange={(e) => handleUpload(e, "airEC")}/>
      <label>5. Kualitas Air/Kondisi Air Kanal - TDS</label>
      <input type="file" onChange={(e) => handleUpload(e, "airTDS")}/>
      <label>5. Kualitas Air/Kondisi Air Kanal - pH</label>
      <input type="file" onChange={(e) => handleUpload(e, "airPH")}/>
      <label>6. Pengukuran Tinggi Muka Air Tanah</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "tmat")}/>
      <label>7. Ketebalan ngambut</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "ketebalanGambut")}/>
      <label>8. Karakteristik substratum - EC</label>
      <input type="file" onChange={(e) => handleUpload(e, "substratumEC")}/>
      <label>8. Karakteristik substratum - pH</label>
      <input type="file" onChange={(e) => handleUpload(e, "substratumPH")}/>
      <label>9. Perkembangan kondisi atau tingkat kerusakan</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "kerusakanLahan")}/>
      <label>10. Karakteristik tanah dan kedalaman lapisan pirit</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "tanahPirit")}/>
      <label>11. Porositas dan Kelengasan</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "porositasKelengasan")}/>
      <label>12. Foto Tambahan</label>
      <input type="file" multiple onChange={(e) => handleUpload(e, "fotoTambahan")}/>
      <button type="submit">Kirim dan Unduh Tallysheet</button>
    </form>
  );
}

export default FormTallysheet;