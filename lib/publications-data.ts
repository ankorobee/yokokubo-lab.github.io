import type { ScholarPub } from "./fetchScholar";

/**
 * 業績リスト（手動管理）
 * 新しい業績を追加する場合はこのファイルを編集してください。
 *
 * type:
 *   J = 論文誌 (Journal)
 *   C = 会議・シンポジウム (Conference)
 *   W = ワークショップ (Workshop)
 *   P = 特許 (Patent)
 *   ? = その他
 */
export const publications: ScholarPub[] = [
  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    title: "ここに論文タイトルを入力してください",
    scholarUrl: "https://scholar.google.co.jp/citations?user=VhHsUvsAAAAJ",
    authors: "著者名",
    venue: "掲載誌・会議名",
    year: 2025,
    citedBy: 0,
    type: "C",
  },
];
