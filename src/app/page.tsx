"use client";

import React, { useState, useMemo } from 'react';

// Dataset sampel teranonimisasi untuk simulasi pencocokan kriteria (UU PDP safe)
const SAMPLE_RESPONDENT_POOL = [
  { token: 'RSP-1042-UNDIP', fakultas: 'FEB', angkatan: '2022', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '99.2%' },
  { token: 'RSP-1189-UNDIP', fakultas: 'FISIP', angkatan: '2023', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '98.5%' },
  { token: 'RSP-1204-UNDIP', fakultas: 'Psikologi', angkatan: '2022', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '100%' },
  { token: 'RSP-1390-UNDIP', fakultas: 'FKM', angkatan: '2023', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '97.8%' },
  { token: 'RSP-1455-UNDIP', fakultas: 'FEB', angkatan: '2023', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '99.0%' },
  { token: 'RSP-1521-UNDIP', fakultas: 'FISIP', angkatan: '2022', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '98.1%' },
  { token: 'RSP-1608-UNDIP', fakultas: 'Psikologi', angkatan: '2024', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '99.6%' },
  { token: 'RSP-1733-UNDIP', fakultas: 'FKM', angkatan: '2022', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '98.9%' },
  { token: 'RSP-1812-UNDIP', fakultas: 'FEB', angkatan: '2022', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '99.4%' },
  { token: 'RSP-1940-UNDIP', fakultas: 'Teknik', angkatan: '2023', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '98.7%' },
  { token: 'RSP-2015-UNDIP', fakultas: 'Psikologi', angkatan: '2023', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '99.1%' },
  { token: 'RSP-2109-UNDIP', fakultas: 'FISIP', angkatan: '2024', domisili: 'Semarang', status: 'Aktif S1', skorReputasi: '97.5%' },
];

export default function App() {
  // Navigasi tampilan dokumen (landing, privacy, tos)
  const [activeDoc, setActiveDoc] = useState('home');

  // State untuk form daftar tunggu (inline expansion)
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('peneliti');
  const [fakultasInput, setFakultasInput] = useState('FEB');
  const [waitlistError, setWaitlistError] = useState('');
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  // State untuk Demo Produk Interaktif (SQL Matching & Token Prefill)
  const [filterFakultas, setFilterFakultas] = useState('Semua');
  const [filterAngkatan, setFilterAngkatan] = useState('Semua');
  const [generatedToken, setGeneratedToken] = useState('RSP-1042-UNDIP');
  const [isVerifyingCsv, setIsVerifyingCsv] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  // Kalkulasi hasil matching secara langsung dari dataset sampel
  const matchedRespondents = useMemo(() => {
    return SAMPLE_RESPONDENT_POOL.filter((item) => {
      const matchFak = filterFakultas === 'Semua' || item.fakultas === filterFakultas;
      const matchAng = filterAngkatan === 'Semua' || item.angkatan === filterAngkatan;
      return matchFak && matchAng;
    });
  }, [filterFakultas, filterAngkatan]);

  // Validasi dan pengiriman daftar tunggu khusus email akademik (.ac.id)
  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    setWaitlistError('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setWaitlistError('Alamat email institusi wajib diisi.');
      return;
    }

    if (!cleanEmail.endsWith('.ac.id')) {
      setWaitlistError('Gunakan email kampus aktif dengan domain .ac.id (contoh: nama@students.undip.ac.id).');
      return;
    }

    setIsSubmittingWaitlist(true);
    setTimeout(() => {
      setIsSubmittingWaitlist(false);
      setWaitlistSuccess(true);
    }, 650);
  };

  // Simulasi pembuatan token unik baru untuk prefill Google Form
  const handleGenerateToken = () => {
    const randomNum = Math.floor(1000 + Math.random() * 8999);
    const newToken = `RSP-${randomNum}-UNDIP`;
    setGeneratedToken(newToken);
    setVerificationResult(null);
  };

  // Simulasi pencocokan CSV hasil Google Form dengan token yang diterbitkan
  const handleSimulateCsvCheck = () => {
    setIsVerifyingCsv(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifyingCsv(false);
      setVerificationResult({
        token: generatedToken,
        status: 'TERVERIFIKASI VALID',
        timestamp: '14 Nov 2026, 05:40 WIB',
        kreditDiberikan: '+1 Kredit Riset',
        catatan: 'Token cocok dengan baris #14 pada berkas CSV Google Form. Identitas responden tetap terenkripsi.',
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#181817] antialiased selection:bg-[#181817] selection:text-[#F4F3EF]">
      {/* Import Tipografi Editorial Serif & Sans/Mono Netral */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap');
        
        .font-editorial {
          font-family: 'Newsreader', Georgia, serif;
        }
        .font-sans-editorial {
          font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-mono-editorial {
          font-family: 'IBM Plex Mono', monospace;
        }
      `}</style>

      <div className="font-sans-editorial mx-auto max-w-4xl px-5 sm:px-8">
        {/* Header Minimal */}
        <header className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#D6D4CD] py-7">
          <div>
            <button
              type="button"
              onClick={() => setActiveDoc('home')}
              className="font-editorial text-2xl font-medium tracking-tight text-[#181817] cursor-pointer text-left"
            >
              Respo
            </button>
            <p className="mt-0.5 text-xs text-[#575652]">
              Pilot Kampus: Universitas Diponegoro
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#4A4945]">
            <button
              type="button"
              onClick={() => {
                setActiveDoc('home');
                setTimeout(() => {
                  document.getElementById('cara-kerja')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className={`cursor-pointer pb-0.5 ${
                activeDoc === 'home' ? 'text-[#181817] underline underline-offset-4' : 'hover:text-[#181817]'
              }`}
            >
              Cara Kerja
            </button>
            <button
              type="button"
              onClick={() => setActiveDoc('privacy')}
              className={`cursor-pointer pb-0.5 ${
                activeDoc === 'privacy' ? 'text-[#181817] underline underline-offset-4' : 'hover:text-[#181817]'
              }`}
            >
              Kebijakan Privasi
            </button>
            <button
              type="button"
              onClick={() => setActiveDoc('tos')}
              className={`cursor-pointer pb-0.5 ${
                activeDoc === 'tos' ? 'text-[#181817] underline underline-offset-4' : 'hover:text-[#181817]'
              }`}
            >
              Ketentuan Layanan
            </button>
          </nav>
        </header>

        {/* Tampilan Utama (Landing Page) */}
        {activeDoc === 'home' && (
          <main>
            {/* Hero Section: Single-column Editorial */}
            <section className="py-16 sm:py-24 border-b border-[#D6D4CD]">
              <p className="font-mono-editorial text-xs uppercase tracking-widest text-[#575652]">
                Infrastruktur Pengumpulan Data Akademik
              </p>

              <h1 className="font-editorial mt-5 text-4xl sm:text-5xl md:text-[54px] font-normal leading-[1.12] tracking-tight text-[#181817] max-w-2xl">
                Responden asli, terverifikasi manusia.
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#3F3E3B]">
                Respo mempertemukan peneliti mahasiswa dengan partisipan manusia terverifikasi berdasarkan kriteria inklusi yang presisi. Profil demografis responden tetap tertutup dan terlindungi, menjaga keabsahan data penelitian ilmiah Anda.
              </p>

              <div className="mt-9">
                {!showWaitlist ? (
                  <button
                    type="button"
                    onClick={() => setShowWaitlist(true)}
                    className="inline-block border border-[#181817] bg-[#181817] px-6 py-3 text-sm font-medium text-[#F4F3EF] hover:bg-[#2E2D2B] focus:outline-none focus:ring-2 focus:ring-[#181817] focus:ring-offset-2 focus:ring-offset-[#F4F3EF] cursor-pointer"
                  >
                    Gabung Daftar Tunggu
                  </button>
                ) : (
                  <div className="mt-6 max-w-lg border border-[#181817] bg-[#ECEAE4] p-6">
                    <div className="flex items-baseline justify-between border-b border-[#D6D4CD] pb-3">
                      <h2 className="font-editorial text-xl text-[#181817]">
                        Pendaftaran Akses Awal (Undip)
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          setShowWaitlist(false);
                          setWaitlistSuccess(false);
                          setWaitlistError('');
                        }}
                        className="text-xs text-[#575652] underline cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>

                    {isSubmittingWaitlist ? (
                      <div className="py-6 space-y-3" aria-busy="true" aria-label="Memproses pendaftaran">
                        <div className="h-4 w-3/4 bg-[#D6D4CD] animate-pulse" />
                        <div className="h-9 w-full bg-[#D6D4CD] animate-pulse" />
                        <div className="h-4 w-1/2 bg-[#D6D4CD] animate-pulse" />
                      </div>
                    ) : waitlistSuccess ? (
                      <div className="py-4 space-y-3">
                        <p className="text-sm font-medium text-[#181817]">
                          Pendaftaran tercatat dalam sistem.
                        </p>
                        <p className="text-xs leading-relaxed text-[#4A4945]">
                          Alamat <span className="font-mono-editorial text-[#181817]">{email}</span> ({fakultasInput}) telah masuk ke dalam daftar tunggu gelombang pertama sebagai{' '}
                          <span className="font-medium text-[#181817]">
                            {role === 'peneliti' ? 'Peneliti' : 'Responden'}
                          </span>
                          . Kami akan mengirimkan pemberitahuan saat akses dibuka.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleWaitlistSubmit} className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="campus-email" className="block text-xs font-medium text-[#181817] mb-1.5">
                            Email Institusi (.ac.id)
                          </label>
                          <input
                            id="campus-email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (waitlistError) setWaitlistError('');
                            }}
                            placeholder="nama@students.undip.ac.id"
                            className="w-full border border-[#8E8C84] bg-[#F4F3EF] px-3 py-2 text-sm text-[#181817] placeholder:text-[#7A7871] focus:border-[#181817] focus:outline-none"
                          />
                          {waitlistError && (
                            <p className="mt-1.5 text-xs text-[#181817] font-medium">
                              Perhatian: {waitlistError}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="fakultas-select" className="block text-xs font-medium text-[#181817] mb-1.5">
                              Fakultas
                            </label>
                            <select
                              id="fakultas-select"
                              value={fakultasInput}
                              onChange={(e) => setFakultasInput(e.target.value)}
                              className="w-full border border-[#8E8C84] bg-[#F4F3EF] px-3 py-2 text-sm text-[#181817] focus:border-[#181817] focus:outline-none"
                            >
                              <option value="FEB">FEB</option>
                              <option value="FISIP">FISIP</option>
                              <option value="FKM">FKM</option>
                              <option value="Psikologi">Psikologi</option>
                              <option value="Teknik">Fakultas Teknik</option>
                              <option value="Fakultas Lainnya">Fakultas Lainnya</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="role-select" className="block text-xs font-medium text-[#181817] mb-1.5">
                              Kebutuhan Utama
                            </label>
                            <select
                              id="role-select"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className="w-full border border-[#8E8C84] bg-[#F4F3EF] px-3 py-2 text-sm text-[#181817] focus:border-[#181817] focus:outline-none"
                            >
                              <option value="peneliti">Peneliti (Skripsi / Tugas Akhir)</option>
                              <option value="responden">Responden Partisipan</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-1">
                          <button
                            type="submit"
                            className="w-full border border-[#181817] bg-[#181817] px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-[#F4F3EF] hover:bg-[#2E2D2B] cursor-pointer"
                          >
                            Kirim Pendaftaran
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Cara Kerja: Vertical Editorial Numbered List */}
            <section id="cara-kerja" className="py-16 sm:py-20 border-b border-[#D6D4CD]">
              <div className="mb-10">
                <p className="font-mono-editorial text-xs uppercase tracking-widest text-[#575652]">
                  Mekanisme Sistem
                </p>
                <h2 className="font-editorial mt-2 text-2xl sm:text-3xl font-normal text-[#181817]">
                  Cara Kerja Pertukaran Responden
                </h2>
              </div>

              <div className="divide-y divide-[#D6D4CD] border-t border-b border-[#D6D4CD]">
                {/* Langkah 01 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-7">
                  <div className="md:col-span-2 font-mono-editorial text-sm text-[#575652]">
                    01.
                  </div>
                  <div className="md:col-span-4 font-editorial text-xl text-[#181817]">
                    Verifikasi Akun Kampus
                  </div>
                  <div className="md:col-span-6 text-sm leading-relaxed text-[#3F3E3B]">
                    Mahasiswa mendaftar menggunakan email institusi (.ac.id) dan melengkapi profil demografis dasar satu kali. Sistem membatasi satu akun untuk setiap identitas mahasiswa aktif.
                  </div>
                </div>

                {/* Langkah 02 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-7">
                  <div className="md:col-span-2 font-mono-editorial text-sm text-[#575652]">
                    02.
                  </div>
                  <div className="md:col-span-4 font-editorial text-xl text-[#181817]">
                    Pencocokan Kriteria Otomatis
                  </div>
                  <div className="md:col-span-6 text-sm leading-relaxed text-[#3F3E3B]">
                    Peneliti menautkan Google Form beserta kriteria inklusi penelitian. Sistem menyaring atribut secara terstruktur dan mengirim pemberitahuan hanya kepada responden yang memenuhi syarat.
                  </div>
                </div>

                {/* Langkah 03 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-7">
                  <div className="md:col-span-2 font-mono-editorial text-sm text-[#575652]">
                    03.
                  </div>
                  <div className="md:col-span-4 font-editorial text-xl text-[#181817]">
                    Pertukaran Kredit dan Insentif Pasti
                  </div>
                  <div className="md:col-span-6 text-sm leading-relaxed text-[#3F3E3B]">
                    Mengisi kuesioner peneliti lain menghasilkan kredit untuk mempercepat distribusi kuesioner milik sendiri. Peneliti juga dapat menyalurkan insentif pasti berbasis escrow bagi responden yang lolos validasi.
                  </div>
                </div>

                {/* Langkah 04 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-7">
                  <div className="md:col-span-2 font-mono-editorial text-sm text-[#575652]">
                    04.
                  </div>
                  <div className="md:col-span-4 font-editorial text-xl text-[#181817]">
                    Verifikasi Token Tanpa Kebocoran Profil
                  </div>
                  <div className="md:col-span-6 text-sm leading-relaxed text-[#3F3E3B]">
                    Pengisian divalidasi melalui token unik pada tautan kuesioner. Data jawaban tetap berada di formulir peneliti dan identitas profil responden tidak pernah dibuka (selaras dengan UU PDP No. 27 Tahun 2022).
                  </div>
                </div>
              </div>
            </section>

            {/* Prototipe Interaktif Nyata: Simulasi Pencocokan Kriteria & Token */}
            <section className="py-16 sm:py-20 border-b border-[#D6D4CD]">
              <div className="mb-8">
                <p className="font-mono-editorial text-xs uppercase tracking-widest text-[#575652]">
                  Prototipe Fungsional
                </p>
                <h2 className="font-editorial mt-2 text-2xl sm:text-3xl font-normal text-[#181817]">
                  Simulasi Pencocokan Kriteria dan Token
                </h2>
                <p className="mt-2 text-sm text-[#3F3E3B] max-w-2xl">
                  Uji coba penyaringan atribut responden di bawah ini untuk melihat kueri SQL yang dijalankan sistem serta cara kerja tautan token pra-isi (prefill) Google Form.
                </p>
              </div>

              <div className="border border-[#181817] bg-[#ECEAE4]">
                {/* Baris Kontrol Filter */}
                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[#D6D4CD] divide-y sm:divide-y-0 sm:divide-x divide-[#D6D4CD]">
                  <div className="p-4">
                    <label htmlFor="sim-fakultas" className="block font-mono-editorial text-[11px] uppercase text-[#575652] mb-1.5">
                      Kriteria Fakultas
                    </label>
                    <select
                      id="sim-fakultas"
                      value={filterFakultas}
                      onChange={(e) => setFilterFakultas(e.target.value)}
                      className="w-full border border-[#8E8C84] bg-[#F4F3EF] px-2.5 py-1.5 text-xs text-[#181817] focus:border-[#181817] focus:outline-none"
                    >
                      <option value="Semua">Semua Fakultas (Undip)</option>
                      <option value="FEB">FEB</option>
                      <option value="FISIP">FISIP</option>
                      <option value="FKM">FKM</option>
                      <option value="Psikologi">Psikologi</option>
                      <option value="Teknik">Teknik</option>
                    </select>
                  </div>

                  <div className="p-4">
                    <label htmlFor="sim-angkatan" className="block font-mono-editorial text-[11px] uppercase text-[#575652] mb-1.5">
                      Kriteria Angkatan
                    </label>
                    <select
                      id="sim-angkatan"
                      value={filterAngkatan}
                      onChange={(e) => setFilterAngkatan(e.target.value)}
                      className="w-full border border-[#8E8C84] bg-[#F4F3EF] px-2.5 py-1.5 text-xs text-[#181817] focus:border-[#181817] focus:outline-none"
                    >
                      <option value="Semua">Semua Angkatan (18+)</option>
                      <option value="2022">2022 (Tingkat Akhir)</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>

                  <div className="p-4 flex flex-col justify-between bg-[#F4F3EF]">
                    <span className="font-mono-editorial text-[11px] uppercase text-[#575652]">
                      Populasi Cocok (Sampel)
                    </span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="font-editorial text-2xl font-medium text-[#181817]">
                        {matchedRespondents.length} Responden
                      </span>
                      <span className="font-mono-editorial text-[11px] text-[#575652]">
                        Domisili: Semarang
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live SQL Query Output */}
                <div className="border-b border-[#D6D4CD] bg-[#F4F3EF] p-4">
                  <div className="font-mono-editorial text-[11px] text-[#575652] mb-1">
                    KUERI PENCOCOKAN BASIS DATA (TANPA MEMBUKA IDENTITAS PRIBADI):
                  </div>
                  <pre className="font-mono-editorial text-xs text-[#181817] overflow-x-auto whitespace-pre-wrap">
                    {`SELECT anonymous_token, reputasi_skor FROM verified_profiles WHERE kampus = 'UNDIP' AND domisili = 'Semarang'${
                      filterFakultas !== 'Semua' ? ` AND fakultas = '${filterFakultas}'` : ''
                    }${filterAngkatan !== 'Semua' ? ` AND angkatan = '${filterAngkatan}'` : ''};`}
                  </pre>
                </div>

                {/* Tabel Token Teranonimisasi */}
                <div className="border-b border-[#D6D4CD] p-4">
                  <div className="font-mono-editorial text-[11px] uppercase text-[#575652] mb-2.5">
                    Daftar Token Responden Terfilter (Identitas Nama dan NIM Disembunyikan)
                  </div>
                  <div className="overflow-x-auto border border-[#D6D4CD] bg-[#F4F3EF]">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#D6D4CD] bg-[#ECEAE4] font-mono-editorial text-[11px] text-[#4A4945]">
                        <tr>
                          <th className="px-3 py-2 font-medium">Token Anonim</th>
                          <th className="px-3 py-2 font-medium">Fakultas</th>
                          <th className="px-3 py-2 font-medium">Angkatan</th>
                          <th className="px-3 py-2 font-medium">Skor Validitas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D6D4CD]">
                        {matchedRespondents.slice(0, 4).map((row) => (
                          <tr key={row.token}>
                            <td className="px-3 py-2 font-mono-editorial text-[#181817]">{row.token}</td>
                            <td className="px-3 py-2 text-[#3F3E3B]">{row.fakultas}</td>
                            <td className="px-3 py-2 text-[#3F3E3B]">{row.angkatan}</td>
                            <td className="px-3 py-2 font-mono-editorial text-[#181817]">{row.skorReputasi}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Generator Tautan Prefill & Validasi CSV */}
                <div className="p-4 sm:p-5 bg-[#ECEAE4]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-mono-editorial text-[11px] uppercase text-[#575652]">
                      Tautan Kuesioner dengan Token Unik Responden
                    </span>
                    <button
                      type="button"
                      onClick={handleGenerateToken}
                      className="self-start sm:self-auto border border-[#181817] bg-[#F4F3EF] px-2.5 py-1 text-xs font-medium text-[#181817] hover:bg-[#181817] hover:text-[#F4F3EF] cursor-pointer"
                    >
                      Terbitkan Token Baru
                    </button>
                  </div>

                  <div className="border border-[#8E8C84] bg-[#F4F3EF] p-2.5 font-mono-editorial text-xs text-[#181817] break-all">
                    https://docs.google.com/forms/d/e/1FAIpQLSd_ContohFormSkripsi/viewform?usp=pp_url&entry.10492={generatedToken}
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-[#4A4945]">
                      Setelah responden mengisi formulir, peneliti mengunggah berkas CSV untuk mencocokkan token secara otomatis.
                    </p>
                    <button
                      type="button"
                      onClick={handleSimulateCsvCheck}
                      className="shrink-0 border border-[#181817] bg-[#181817] px-4 py-2 text-xs font-medium text-[#F4F3EF] hover:bg-[#2E2D2B] cursor-pointer"
                    >
                      Uji Verifikasi Token CSV
                    </button>
                  </div>

                  {/* Skeleton Loader saat memverifikasi CSV */}
                  {isVerifyingCsv && (
                    <div className="mt-4 border border-[#D6D4CD] bg-[#F4F3EF] p-4 space-y-2.5" aria-busy="true">
                      <div className="h-3.5 w-1/3 bg-[#D6D4CD] animate-pulse" />
                      <div className="h-3 w-full bg-[#D6D4CD] animate-pulse" />
                      <div className="h-3 w-2/3 bg-[#D6D4CD] animate-pulse" />
                    </div>
                  )}

                  {/* Hasil Verifikasi Token */}
                  {verificationResult && !isVerifyingCsv && (
                    <div className="mt-4 border border-[#181817] bg-[#F4F3EF] p-4 text-xs space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6D4CD] pb-2">
                        <span className="font-mono-editorial font-medium text-[#181817]">
                          Status: {verificationResult.status} ({verificationResult.token})
                        </span>
                        <span className="font-mono-editorial text-[#575652]">
                          {verificationResult.timestamp}
                        </span>
                      </div>
                      <p className="text-[#3F3E3B] pt-1">
                        {verificationResult.catatan}
                      </p>
                      <p className="font-mono-editorial text-[#181817]">
                        Distribusi: {verificationResult.kreditDiberikan}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        )}

        {/* Halaman Kebijakan Privasi (UU PDP No. 27/2022) */}
        {activeDoc === 'privacy' && (
          <main className="py-14 sm:py-20 border-b border-[#D6D4CD]">
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setActiveDoc('home')}
                className="font-mono-editorial text-xs text-[#575652] underline cursor-pointer"
              >
                Kembali ke Beranda
              </button>
              <h1 className="font-editorial mt-4 text-3xl sm:text-4xl font-normal text-[#181817]">
                Kebijakan Privasi dan Perlindungan Data Pribadi
              </h1>
              <p className="mt-2 font-mono-editorial text-xs text-[#575652]">
                Disusun selaras dengan Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)
              </p>
            </div>

            <div className="space-y-8 text-sm leading-relaxed text-[#3F3E3B] max-w-2xl">
              <section>
                <h2 className="font-editorial text-xl text-[#181817] mb-2">
                  1. Prinsip Pemisahan Data Profil dan Jawaban Penelitian
                </h2>
                <p>
                  Respo bertindak sebagai perantara pencocokan kriteria responden. Data profil demografis yang Anda masukkan saat pendaftaran (seperti fakultas, angkatan, domisili, dan kebiasaan penggunaan layanan) disimpan secara terenkripsi dan tidak pernah diserahkan kepada peneliti maupun pihak ketiga.
                </p>
              </section>

              <section>
                <h2 className="font-editorial text-xl text-[#181817] mb-2">
                  2. Verifikasi Token Anonim
                </h2>
                <p>
                  Untuk memastikan pengisian kuesioner dilakukan oleh responden yang sah tanpa membuka alamat email kampus Anda kepada peneliti, sistem menerbitkan token sesi acak. Peneliti hanya menerima token tersebut di dalam lembar jawaban formulir mereka untuk keperluan validasi kredit.
                </p>
              </section>

              <section>
                <h2 className="font-editorial text-xl text-[#181817] mb-2">
                  3. Hak Subjek Data Mahasiswa
                </h2>
                <p>
                  Sesuai ketentuan UU PDP, setiap pengguna berhak mengakses, memperbarui, menarik persetujuan pemrosesan data profil, serta mengajukan penghapusan akun beserta seluruh riwayat atribut demografisnya secara permanen kapan saja melalui pengaturan akun.
                </p>
              </section>
            </div>
          </main>
        )}

        {/* Halaman Ketentuan Layanan (Terms of Service & Etika Akademik) */}
        {activeDoc === 'tos' && (
          <main className="py-14 sm:py-20 border-b border-[#D6D4CD]">
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setActiveDoc('home')}
                className="font-mono-editorial text-xs text-[#575652] underline cursor-pointer"
              >
                Kembali ke Beranda
              </button>
              <h1 className="font-editorial mt-4 text-3xl sm:text-4xl font-normal text-[#181817]">
                Ketentuan Layanan dan Standar Etika Akademik
              </h1>
              <p className="mt-2 font-mono-editorial text-xs text-[#575652]">
                Berlaku untuk seluruh peneliti dan responden pada fase Pilot Universitas Diponegoro
              </p>
            </div>

            <div className="space-y-8 text-sm leading-relaxed text-[#3F3E3B] max-w-2xl">
              <section>
                <h2 className="font-editorial text-xl text-[#181817] mb-2">
                  1. Larangan Mutlak Data Sintetis dan Otomasi
                </h2>
                <p>
                  Seluruh pengisian kuesioner wajib dilakukan secara sadar oleh manusia asli yang memiliki akun institusi terverifikasi. Penggunaan skrip otomatis, bot, atau model kecerdasan buatan (AI) untuk menjawab kuesioner merupakan pelanggaran berat yang mengakibatkan pencabutan akses permanen.
                </p>
              </section>

              <section>
                <h2 className="font-editorial text-xl text-[#181817] mb-2">
                  2. Batas Usia dan Persetujuan Setelah Penjelasan (Informed Consent)
                </h2>
                <p>
                  Partisipan yang menggunakan layanan ini wajib berusia minimal 18 tahun. Setiap peneliti diwajibkan menyertakan lembar informasi tujuan penelitian, estimasi waktu pengisian, serta pernyataan kesukarelaan (informed consent) pada halaman awal kuesioner sebelum pengambilan data dimulai.
                </p>
              </section>

              <section>
                <h2 className="font-editorial text-xl text-[#181817] mb-2">
                  3. Integritas Karya Ilmiah
                </h2>
                <p>
                  Respo merupakan infrastruktur rekrutmen partisipan penelitian mandiri. Layanan ini dilarang digunakan untuk transaksi pengerjaan tugas akhir, penulisan skripsi oleh pihak lain, maupun praktik manipulasi data penelitian.
                </p>
              </section>

              <section>
                <h2 className="font-editorial text-xl text-[#181817] mb-2">
                  4. Skema Insentif Pasti Berbasis Escrow
                </h2>
                <p>
                  Peneliti yang menyediakan kompensasi finansial bagi responden wajib menggunakan skema hadiah pasti untuk sejumlah responden valid pertama yang memenuhi kriteria, dengan dana yang ditempatkan pada sistem penampungan (escrow) sebelum kuesioner ditayangkan.
                </p>
              </section>
            </div>
          </main>
        )}

        {/* Footer Minimal */}
        <footer className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#575652]">
          <div>
            <span className="font-editorial text-sm text-[#181817]">Respo</span>
            <span className="mx-2 text-[#D6D4CD]">|</span>
            <span>Pilot Kampus Universitas Diponegoro, Semarang.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveDoc('privacy')}
              className="hover:text-[#181817] underline underline-offset-4 cursor-pointer"
            >
              Kebijakan Privasi (UU PDP)
            </button>
            <button
              type="button"
              onClick={() => setActiveDoc('tos')}
              className="hover:text-[#181817] underline underline-offset-4 cursor-pointer"
            >
              Ketentuan Layanan & Etika Akademik
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
