import { useState, useEffect } from "react";
import { Calendar, Ticket, CreditCard, Shield, Globe, Star, CheckCircle2, Mail, Phone, ArrowRight, PlayCircle, Search, X, MapPin, Clock, Users, Tag } from "lucide-react";
import eventsData from "./data/events.json";

export default function TicketLandingPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData.events);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCategoryEvents, setShowCategoryEvents] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    quantity: 1
  });

  // Filter events based on search and category
  useEffect(() => {
    let filtered = eventsData.events;
    
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory]);

  const formatPrice = (price) => {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat('vi-VN').format(price) + "đ";
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleBuyTicket = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategoryEvents(true);
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventId: selectedEvent.id,
      fullName: ticketForm.fullName,
      email: ticketForm.email,
      org: ticketForm.org || "",
      phone: ticketForm.phone,
      quantity: ticketForm.quantity,
    };
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbxgzKb9suy_x7c8_zia3l6KIHkv1BoY4AlEvlzxajO-deDaoYSN-SdmEpXZIl53OkAb/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Gửi không thành công, thử lại giúp mình!");
    } finally {
      setSubmitting(false);
    }
    alert(`Đặt vé thành công cho sự kiện: ${selectedEvent.title}\nSố lượng: ${ticketForm.quantity}\nTổng tiền: ${formatPrice(selectedEvent.price * ticketForm.quantity)}`);
    setShowModal(false);
    setTicketForm({ fullName: "", email: "", phone: "", quantity: 1 });
  };

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
      eventId: null,
      quantity: ticketForm.quantity,
      email: email,
      org: e.target.org.value,
      phone: e.target.phone.value,
    };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbxgzKb9suy_x7c8_zia3l6KIHkv1BoY4AlEvlzxajO-deDaoYSN-SdmEpXZIl53OkAb/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
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
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                <input 
                  className="w-full rounded-2xl bg-neutral-900 border border-neutral-800 pl-10 pr-4 py-3 outline-none focus:border-neutral-600" 
                  placeholder="Tìm sự kiện: EDM, hội thảo, workshop…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                className="rounded-2xl px-5 py-3 bg-white text-neutral-900 font-medium hover:bg-white/90"
                onClick={() => setShowCategoryEvents(true)}
              >
                Tìm vé
              </button>
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
              {eventsData.events.slice(0, 3).map((event, index) => (
                <div key={event.id} className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5"/>
                    <div>
                      <p className="text-sm text-white/70">{event.category} • {formatDate(event.date)}</p>
                      <p className="font-medium">{event.title}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-white/70">{formatPrice(event.price)}</span>
                    <button 
                      onClick={() => handleBuyTicket(event)}
                      className="rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm font-medium">
                      {event.price === 0 ? "Đăng ký" : "Mua vé"}
                    </button>
                  </div>
                </div>
              ))}
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
          <button 
            onClick={() => {setSelectedCategory(""); setShowCategoryEvents(true);}}
            className="text-sm text-white/70 hover:text-white">
            Xem tất cả →
          </button>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {eventsData.categories.map((category, i) => (
            <button
              key={i}
              onClick={() => handleCategoryClick(category.name)}
              className="group rounded-2xl overflow-hidden border border-neutral-800 bg-[linear-gradient(135deg,#0b0b0b,#161616)] hover:border-neutral-600 transition-all"
            >
              <div className={`aspect-video bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition grid place-content-center text-4xl`}>
                {category.icon}
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-left">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {eventsData.events.filter(e => e.category === category.name).length} sự kiện
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/50 group-hover:text-white/80 transition"/>
              </div>
            </button>
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
              <blockquote className="text-lg">"{t.q}"</blockquote>
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

      {/* TICKET PURCHASE MODAL */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
                  <p className="text-neutral-400 text-sm mt-1">{selectedEvent.organizer}</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedEvent.date)} • {selectedEvent.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <MapPin className="h-4 w-4" />
                  {selectedEvent.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <Users className="h-4 w-4" />
                  Còn {selectedEvent.availableTickets} vé
                </div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Tag className="h-5 w-5" />
                  {formatPrice(selectedEvent.price)}
                  {selectedEvent.originalPrice > selectedEvent.price && (
                    <span className="text-sm line-through text-neutral-500">
                      {formatPrice(selectedEvent.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={ticketForm.fullName}
                    onChange={(e) => setTicketForm({...ticketForm, fullName: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-neutral-500"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={ticketForm.email}
                    onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-neutral-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    required
                    value={ticketForm.phone}
                    onChange={(e) => setTicketForm({...ticketForm, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-neutral-500"
                    placeholder="0901234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số lượng vé</label>
                  <select
                    value={ticketForm.quantity}
                    onChange={(e) => setTicketForm({...ticketForm, quantity: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-neutral-500"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} vé</option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-neutral-700 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span>Tổng cộng:</span>
                    <span className="text-xl font-semibold">
                      {formatPrice(selectedEvent.price * ticketForm.quantity)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-white text-neutral-900 font-medium py-3 rounded-xl hover:bg-neutral-100 transition"
                  >
                    {selectedEvent.price === 0 ? "Đăng ký miễn phí" : "Thanh toán"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* EVENTS LISTING MODAL */}
      {showCategoryEvents && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedCategory ? `Sự kiện ${selectedCategory}` : "Tất cả sự kiện"}
                  </h3>
                  <p className="text-neutral-400 text-sm mt-1">
                    {filteredEvents.length} sự kiện được tìm thấy
                  </p>
                </div>
                <button 
                  onClick={() => {setShowCategoryEvents(false); setSelectedCategory(""); setSearchQuery("");}}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search and filter */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sự kiện..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-neutral-500"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-3 py-1 rounded-full text-sm transition ${!selectedCategory ? 'bg-white text-neutral-900' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
                  >
                    Tất cả
                  </button>
                  {eventsData.categories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3 py-1 rounded-full text-sm transition ${selectedCategory === cat.name ? 'bg-white text-neutral-900' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Events grid */}
              <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredEvents.map(event => (
                  <div key={event.id} className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-neutral-400">{event.organizer}</p>
                      </div>
                      <span className="text-xs bg-neutral-700 px-2 py-1 rounded">{event.category}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-neutral-300 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(event.date)} • {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Còn {event.availableTickets} vé
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold">{formatPrice(event.price)}</span>
                        {event.originalPrice > event.price && (
                          <span className="text-sm line-through text-neutral-500 ml-2">
                            {formatPrice(event.originalPrice)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setShowCategoryEvents(false);
                          handleBuyTicket(event);
                        }}
                        className="bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium hover:bg-neutral-100 transition"
                      >
                        {event.price === 0 ? "Đăng ký" : "Mua vé"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-8 text-neutral-400">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Không tìm thấy sự kiện nào phù hợp</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}