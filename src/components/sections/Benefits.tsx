import { motion } from "framer-motion";

const benefits = [
  { title: "Bền vững 10–20 năm", desc: "Chất liệu granite cứng chắc, hạn chế xuống cấp theo thời gian." },
  { title: "Chống nước & chống thấm", desc: "Giữ bề mặt ổn định, hạn chế ố màu do độ ẩm và nước." },
  { title: "Dễ vệ sinh, giữ vẻ mới", desc: "Lau chùi nhanh, hạn chế bám bẩn và giữ thẩm mỹ lâu dài." },
  { title: "Premium look, sang trọng", desc: "Vân đá tự nhiên tạo điểm nhấn đẳng cấp cho không gian." },
];

function Icon({ kind }: { kind: string }) {
  if (kind === "durable") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 1.66667L15.7738 4.38843C16.4343 4.70226 16.8333 5.37235 16.8333 6.10437V11.2073C16.8333 13.8079 15.2151 16.1572 12.7938 17.1017L10 18.185L7.20625 17.1017C4.78485 16.1572 3.16667 13.8079 3.16667 11.2073V6.10437C3.16667 5.37235 3.56569 4.70226 4.22623 4.38843L10 1.66667Z"
          stroke="#4A5D73"
          strokeWidth="1.4"
        />
        <path
          d="M7.08337 10.1667L9.07503 12.1583L12.9167 8.31667"
          stroke="#4A5D73"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "water") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 1.66667C10 1.66667 15.8333 7.00002 15.8333 11.1667C15.8333 14.2445 13.2445 16.8333 10.1667 16.8333C7.08888 16.8333 4.50004 14.2445 4.50004 11.1667C4.50004 7.00002 10 1.66667 10 1.66667Z"
          stroke="#4A5D73"
          strokeWidth="1.4"
        />
        <path
          d="M7.5 12C7.8 13.1 8.7 13.9 10 14.1"
          stroke="#4A5D73"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "clean") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6.2 2.83337H13.8C14.3523 2.83337 14.8 3.28108 14.8 3.83337V16.1667C14.8 16.719 14.3523 17.1667 13.8 17.1667H6.2C5.64772 17.1667 5.20001 16.719 5.20001 16.1667V3.83337C5.20001 3.28108 5.64772 2.83337 6.2 2.83337Z"
          stroke="#4A5D73"
          strokeWidth="1.4"
        />
        <path
          d="M7.91667 6.16667H12.0833"
          stroke="#4A5D73"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7.91667 9.33333H12.0833"
          stroke="#4A5D73"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 9.99998C3.5 5.8579 6.85786 2.5 11 2.5C15.1421 2.5 18.5 5.8579 18.5 9.99998C18.5 14.1421 15.1421 17.5 11 17.5C6.85786 17.5 3.5 14.1421 3.5 9.99998Z"
        stroke="#4A5D73"
        strokeWidth="1.4"
      />
      <path
        d="M7.91667 11.6667L9.58333 13.3333L14 8.91667"
        stroke="#4A5D73"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Benefits() {
  return (
    <section
      id="benefits"
      className="bg-page py-16 sm:py-20"
      aria-label="Ưu điểm"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light">
            WHY GRANITE
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-main sm:text-4xl">
            Vì sao khách hàng chọn đá granite?
          </h2>
          <p className="mt-3 text-text-secondary">
            Độ bền cao, chống nước tốt và vẻ đẹp sang trọng. TND Granite tối
            ưu quy trình để mỗi bậc thang đều hoàn thiện tỉ mỉ.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {benefits.map((b, idx) => {
            const kind = idx === 0 ? "durable" : idx === 1 ? "water" : idx === 2 ? "clean" : "premium";
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-gold/25 bg-gold/5 text-gold-light transition group-hover:bg-gold/10">
                      <Icon kind={kind} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-text-main">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {b.desc}
                    </p>
                  </div>
                  <div className="mt-1 text-xs font-black text-gold-light">
                    {idx + 1}/4
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-text-main">
                Đẳng cấp bắt đầu từ chi tiết.
              </div>
              <div className="mt-1 text-sm text-text-secondary">
                TND Granite tư vấn chọn đá, phối màu và tối ưu độ khít theo
                kích thước thực tế.
              </div>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="inline-flex items-center justify-center rounded-full border border-gold/35 bg-white px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold/5 hover:-translate-y-[1px]"
            >
              Nhận báo giá ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

