"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    affiliation: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("submitting");
    // Placeholder: replace with actual form submission logic
    await new Promise((r) => setTimeout(r, 1000));
    setState("success");
  };

  if (state === "success") {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">✿</div>
        <h3 className="text-lg font-bold text-[#3D1B3F] mb-2">
          送信が完了しました
        </h3>
        <p className="text-sm text-[#6E4B7A]">
          お問い合わせいただきありがとうございます。
          <br />
          数日以内にご返信いたします。
        </p>
        <button
          onClick={() => {
            setState("idle");
            setForm({ name: "", email: "", affiliation: "", subject: "", message: "" });
          }}
          className="mt-6 text-sm text-[#BC9EC1] hover:text-[#6E4B7A] transition-colors"
        >
          別の問い合わせをする →
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-[#EDD8E8] bg-[#FEFAF9] text-[#3D1B3F] text-sm placeholder:text-[#BC9EC1]/60 focus:outline-none focus:border-[#BC9EC1] focus:ring-2 focus:ring-[#BC9EC1]/20 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#6E4B7A] mb-1.5">
            お名前 <span className="text-[#BC9EC1]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="山田 花子"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6E4B7A] mb-1.5">
            メールアドレス <span className="text-[#BC9EC1]">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="example@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#6E4B7A] mb-1.5">
          所属・学校名
        </label>
        <input
          type="text"
          name="affiliation"
          value={form.affiliation}
          onChange={handleChange}
          placeholder="東京大学 工学部"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#6E4B7A] mb-1.5">
          お問い合わせ種別 <span className="text-[#BC9EC1]">*</span>
        </label>
        <select
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">選択してください</option>
          <option value="admission">研究室見学・配属について</option>
          <option value="research">研究内容について</option>
          <option value="collaboration">共同研究・産学連携について</option>
          <option value="media">取材・メディアについて</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#6E4B7A] mb-1.5">
          メッセージ <span className="text-[#BC9EC1]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="お問い合わせ内容をご記入ください。"
          className={inputClass + " resize-none"}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#BC9EC1] text-white text-sm font-medium hover:bg-[#A888B0] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm shadow-[#BC9EC1]/30"
        >
          {state === "submitting" ? "送信中..." : "送信する"}
        </button>
      </div>
    </form>
  );
}
