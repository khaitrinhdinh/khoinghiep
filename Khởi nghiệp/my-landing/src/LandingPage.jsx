import { useState } from "react";
import { Calendar, Ticket, CreditCard, Shield, Globe, Star, CheckCircle2, Mail, Phone, ArrowRight, PlayCircle } from "lucide-react";

export default function TicketLandingPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getUTM = () => {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "",
      utm_content: p.get("utm_content") || "",
      utm_term: p.get("utm_term") || "",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const utm = getUTM();
    const payload = {
      email,
      org: e.target.org.value,
      phone: e.target.phone.value,
      ...utm,
      referrer: document.referrer || "",
      path: window.location.pathname + window.location.search,
      userAgent: navigator.userAgent,
    };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbybKnirwtF1atd5Smjc2w03qdS4fuPBD2TV-2K3S_mlAceQLZ5fUbHdqZpd4E9BlGVf/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // nếu dính CORS:
        // mode: "no-cors",
      });
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Gửi không thành công, thử lại giúp mình!");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* --- SEO / Tracking placeholders --- */}
      {/* <script> Add GA / PostHog / Clarity here </script> */}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800/60">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            <span className="font-semibold tracking-tight">VéNhanh</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#tinh-nang" className="hover:text-white/90">Tính năng</a>
            <a href="#su-kien" className="hover:text-white/90">Sự kiện</a>
            <a href="#quy-trinh" className="hover:text-white/90">Cách hoạt động</a>
            <a href="#bang-gia" className="hover:text-white/90">Phí dịch vụ</a>
            <a href="#faq" className="hover:text-white/90">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#dang-ky" className="hidden md:inline rounded-xl px-4 py-2 border border-neutral-700 hover:border-neutral-500 transition">Đăng ký</a>
            <a href="#dang-ky" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white text-neutral-900 font-medium hover:bg-white/90 transition">
              Bắt đầu miễn phí <ArrowRight className="h-4 w-4"/>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(120,120,255,0.25),rgba(0,0,0,0))]"/>
        <div className="w-full px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-white/60 mb-3">Sàn bán vé trực tuyến</span>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Bán & mua vé sự kiện <span className="text-white/80">nhanh gọn</span>, thanh toán <span className="text-white/80">an toàn</span>.</h1>
            <p className="mt-4 text-white/70 max-w-xl">VéNhanh giúp nhà tổ chức mở bán trong vài phút, người dùng đặt vé chỉ với 3 bước. Không cần kỹ thuật. Phí minh bạch.</p>

            {/* SEARCH */}
            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              <input className="sm:col-span-2 w-full rounded-2xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:border-neutral-600" placeholder="Tìm sự kiện: EDM, hội thảo, workshop…"/>
              <button className="rounded-2xl px-5 py-3 bg-white text-neutral-900 font-medium hover:bg-white/90">Tìm vé</button>
            </div>

            {/* TRUST */}
            <div className="mt-6 flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-1"><Shield className="h-4 w-4"/> Thanh toán bảo mật</div>
              <div className="flex items-center gap-1"><Star className="h-4 w-4"/> Hỗ trợ 24/7</div>
              <div className="flex items-center gap-1"><Globe className="h-4 w-4"/> E-ticket toàn quốc</div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a href="#dang-ky" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-white text-neutral-900 font-medium hover:bg-white/90">Dùng thử miễn phí</a>
              <a href="#demo" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-neutral-700 hover:border-neutral-500 transition"><PlayCircle className="h-4 w-4"/> Xem demo</a>
            </div>
          </div>

          {/* CARD STACK */}
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 blur-3xl rounded-[2rem]"/>
            <div className="relative grid gap-4">
              <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 shadow-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5"/>
                  <div>
                    <p className="text-sm text-white/70">Workshop • 20/08</p>
                    <p className="font-medium">GenAI for Beginners</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-white/70">Từ 199.000đ</span>
                  <button className="rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm font-medium">Mua vé</button>
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 shadow-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5"/>
                  <div>
                    <p className="text-sm text-white/70">Concert • 24/08</p>
                    <p className="font-medium">Summer EDM Night</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-white/70">Từ 399.000đ</span>
                  <button className="rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm font-medium">Mua vé</button>
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 shadow-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5"/>
                  <div>
                    <p className="text-sm text-white/70">Talk • 31/08</p>
                    <p className="font-medium">Tech Leaders Meetup</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-white/70">Miễn phí</span>
                  <button className="rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm font-medium">Đăng ký</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="tinh-nang" className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold">Mở bán trong 10 phút. Tất cả trong một.</h2>
          <p className="mt-3 text-white/70">Tạo sự kiện, cấu hình vé, nhận thanh toán và xuất e-ticket tự động.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            {
              icon: <Ticket className="h-5 w-5"/>,
              title: "Tạo & quản lý vé",
              desc: "Nhiều hạng vé, mã giảm giá, giới hạn số lượng, theo dõi bán real-time.",
            },
            {
              icon: <CreditCard className="h-5 w-5"/>,
              title: "Thanh toán đa kênh",
              desc: "VNPay/MoMo/QR/Thẻ. Biên lai gửi mail tức thì.",
            },
            {
              icon: <Shield className="h-5 w-5"/>,
              title: "Chống vé giả",
              desc: "E-ticket kèm QR duy nhất, check-in 1 chạm tại cửa.",
            },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 grid place-content-center mb-3">{f.icon}</div>
              <h3 className="font-medium">{f.title}</h3>
              <p className="mt-2 text-white/70 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENT CATEGORIES */}
      <section id="su-kien" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-xl md:text-2xl font-semibold">Danh mục nổi bật</h2>
          <a href="#" className="text-sm text-white/70 hover:text-white">Xem tất cả →</a>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Âm nhạc", "Hội thảo", "Thể thao", "Ưu đãi sớm"].map((c, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden border border-neutral-800 bg-[linear-gradient(135deg,#0b0b0b,#161616)]">
              <div className="aspect-video bg-neutral-800/50 grid place-content-center text-white/50 group-hover:text-white/80 transition">
                <Calendar className="h-8 w-8"/>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="font-medium">{c}</span>
                <ArrowRight className="h-4 w-4 text-white/50"/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="quy-trinh" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold">3 bước để bán hết vé</h2>
          <p className="mt-3 text-white/70">Làm xong trong một buổi cà phê.</p>
        </div>
        <ol className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {step: 1, title: "Tạo sự kiện", desc: "Nhập thông tin, tải ảnh, chọn hạng vé & số lượng."},
            {step: 2, title: "Chia sẻ link", desc: "Đăng lên Facebook, Zalo, Email, đặt mã QR tại poster."},
            {step: 3, title: "Nhận tiền & check-in", desc: "Tiền về tài khoản, e-ticket gửi mail; quét QR tại cửa."},
          ].map((s, i) => (
            <li key={i} className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white text-neutral-900 font-semibold grid place-content-center">{s.step}</span>
                <h3 className="font-medium">{s.title}</h3>
              </div>
              <p className="mt-2 text-white/70 text-sm">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PRICING */}
      <section id="bang-gia" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold">Phí dịch vụ minh bạch</h2>
          <p className="mt-3 text-white/70">Miễn phí tạo sự kiện. Chỉ thu khi có giao dịch thành công.</p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            {name: "Starter", price: "0đ", note: "Thử nghiệm nhanh", features: ["Không giới hạn sự kiện", "Form đặt vé tiêu chuẩn", "Báo cáo cơ bản"]},
            {name: "Pro", price: "5% / giao dịch", note: "Phổ biến", features: ["Thanh toán đa kênh", "Mã giảm giá / Early bird", "Check-in QR"]},
            {name: "Business", price: "Liên hệ", note: "Tùy chỉnh", features: ["Tên miền riêng", "Thương hiệu riêng (white-label)", "Hỗ trợ ưu tiên"]},
          ].map((p, i) => (
            <div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-medium">{p.name}</h3>
                <span className="text-xs px-2 py-1 rounded-lg border border-neutral-700 text-white/70">{p.note}</span>
              </div>
              <p className="mt-3 text-3xl font-semibold">{p.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {p.features.map((f, k) => (
                  <li key={k} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5"/> {f}</li>
                ))}
              </ul>
              <a href="#dang-ky" className="mt-5 inline-block w-full text-center rounded-xl px-4 py-2 bg-white text-neutral-900 font-medium hover:bg-white/90">Chọn gói này</a>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {q: "Bán 1.200 vé sau 3 ngày.", a: "Bảng điều khiển đơn giản, check-in siêu nhanh.", n: "Đơn vị tổ chức EDM"},
            {q: "Tạo sự kiện trong 7 phút.", a: "Không cần code, phí rõ ràng.", n: "Cộng đồng Startup"},
            {q: "Giảm 40% thời gian soát vé.", a: "QR một chạm, giảm tắc nghẽn cổng vào.", n: "Hội thảo Tech"},
          ].map((t, i) => (
            <figure key={i} className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
              <blockquote className="text-lg">“{t.q}”</blockquote>
              <figcaption className="mt-2 text-white/70 text-sm">{t.a} — <span className="text-white/80">{t.n}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="dang-ky" className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Đăng ký mở bán thử nghiệm</h2>
            <p className="mt-3 text-white/70">Nhập email để nhận link tạo sự kiện & ưu đãi phí dịch vụ 0% cho 50 vé đầu tiên.</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5"/> Không ràng buộc hợp đồng</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5"/> Hỗ trợ cấu hình vé miễn phí</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5"/> Demo check-in tại sự kiện</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-white text-neutral-900 grid place-content-center">
                  <CheckCircle2 className="h-6 w-6"/>
                </div>
                <h3 className="mt-4 text-xl font-medium">Đã nhận thông tin!</h3>
                <p className="mt-2 text-white/70 text-sm">Chúng tôi sẽ gửi hướng dẫn vào email của bạn trong ít phút.</p>
                <button className="mt-6 text-sm underline text-white/70 hover:text-white" onClick={() => setSubmitted(false)}>Gửi email khác</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" data-analytics="lead-form">
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@congty.com"
                    className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-neutral-600"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-white/70">Tên của bạn</label>
                    <input
                        name="org"
                        className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-neutral-600"
                        placeholder="Nguyễn văn A"
                      />
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Số điện thoại</label>
                    <input
                      name="phone"
                      className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-neutral-600"
                      placeholder="09xx xxx xxx"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 bg-white text-neutral-900 font-medium hover:bg-white/90 disabled:opacity-60"
                >
                  {submitting ? "Đang gửi…" : "Nhận link mở bán"}
                </button>
                <p className="text-xs text-white/50">Bấm đăng ký tức là bạn đồng ý với Điều khoản & Chính sách bảo mật.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-xl md:text-2xl font-semibold">Câu hỏi thường gặp</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {[
            {q: "Có cần website riêng không?", a: "Không. Bạn dùng link landing page (ví dụ: abc.venhanh.site) để bán vé ngay."},
            {q: "Tiền về thế nào?", a: "Thanh toán qua đối tác cổng thanh toán; đối soát và trả về tài khoản đã đăng ký."},
            {q: "Check-in có cần mạng?", a: "Ứng dụng check-in hỗ trợ offline tạm thời và đồng bộ khi có mạng."},
            {q: "Có xuất hóa đơn?", a: "Hỗ trợ xuất chứng từ/hoá đơn theo yêu cầu (gói Business)."},
          ].map((f, i) => (
            <div key={i} className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-5">
              <p className="font-medium">{f.q}</p>
              <p className="mt-1 text-white/70 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800/60">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-white/70">
          <div>
            <div className="flex items-center gap-2 text-white">
              <Ticket className="h-5 w-5"/>
              <span className="font-semibold">VéNhanh</span>
            </div>
            <p className="mt-2">Sàn bán vé trực tuyến cho nhà tổ chức sự kiện tại Việt Nam.</p>
          </div>
          <div>
            <p className="text-white font-medium mb-2">Liên hệ</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4"/> hello@venhanh.site</p>
            <p className="flex items-center gap-2 mt-1"><Phone className="h-4 w-4"/> 09xx xxx xxx</p>
          </div>
          <div>
            <p className="text-white font-medium mb-2">Pháp lý</p>
            <a className="block hover:text-white" href="#">Điều khoản dịch vụ</a>
            <a className="block hover:text-white" href="#">Chính sách bảo mật</a>
          </div>
        </div>
        <div className="text-center text-xs text-white/40 pb-8">© {new Date().getFullYear()} VéNhanh. All rights reserved.</div>
      </footer>
    </div>
  );
}
