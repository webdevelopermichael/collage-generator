import React from 'react';
import { BookOpen, CheckCircle, Lightbulb, Share2 } from 'lucide-react';
import { Language } from '../../core/i18n';

interface SeoContentProps {
  language: Language;
}

export const SeoContent: React.FC<SeoContentProps> = ({ language }) => {
  if (language === 'ru') {
    return (
      <article className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-300">
        <div className="border-b border-neutral-800 pb-8 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-400 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Руководство по дизайну и композиции</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            Полное руководство по созданию фотоколлажей и SaaS-мокапов в 2026 году
          </h2>
          <p className="text-sm text-neutral-400">
            Лучшие практики визуальной иерархии, бенто-сеток и публикации в социальных сетях.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed">
          <section>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              1. Почему коллажи работают эффективнее одиночных картинок
            </h3>
            <p>
              В современных лентах социальных сетей (X, Telegram, Instagram, VK) внимание пользователя удерживается менее 1.5 секунд.
              Многослойный коллаж или <strong>Bento-сетка</strong> создает визуальную глубину и передает полную историю продукта
              в одном компактном и эстетичном посте.
            </p>
            <p>
              Для разработчиков и фаундеров демонстрация интерфейса вместе с бейджами метрик (например, <em>+142% MRR</em> или <em>5.0 Star Rating</em>)
              дает мгновенное социальное доказательство и существенно увеличивает CTR.
            </p>
          </section>

          <section>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              2. Принципы сбалансированной композиции
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong>Главный акцент (Hero):</strong> Выделяйте главный скриншот в большой блок (60% площади), дополняя его 2–4 деталями.
              </li>
              <li>
                <strong>Гармоничные отступы и радиус:</strong> Одинаковые расстояния между блоками (12px–20px) и скругления придают премиальный вид.
              </li>
              <li>
                <strong>Контрастный темный фон:</strong> Радиальные градиенты подчеркивают скриншоты и великолепно смотрятся на смартфонах.
              </li>
            </ul>
          </section>
        </div>
      </article>
    );
  }

  if (language === 'ua') {
    return (
      <article className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-300">
        <div className="border-b border-neutral-800 pb-8 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-400 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Керівництво з дизайну та композиції</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            Повний посібник зі створення естетичних фотоколажів та SaaS-мокапів
          </h2>
          <p className="text-sm text-neutral-400">
            Кращі практики візуальної ієрархії, бенто-сіток та публікацій у соцмережах у 2026 році.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed">
          <section>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              1. Чому колажі привертають більше уваги
            </h3>
            <p>
              У сучасних стрічках соцмереж фокус уваги триває менше 1.5 секунди.
              Композиція з кількох зображень або <strong>Bento-сітка</strong> дозволяє розповісти повну історію
              вашого продукту або події в одному інформативному візуалі.
            </p>
            <p>
              Поєднання інтерфейсу з бейджами показників (наприклад, <em>+142% MRR</em> або <em>5.0 Оцінка</em>)
              підсилює довіру та стимулює кліки.
            </p>
          </section>

          <section>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              2. Основи збалансованого макету
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong>Головний елемент:</strong> Виділяйте провідне зображення більшим розміром, супроводжуючи його компактними акцентами.
              </li>
              <li>
                <strong>Рівномірні відступи:</strong> Акуратні проміжки та заокруглені кути створюють професійний дизайн.
              </li>
              <li>
                <strong>Глибокий контраст:</strong> Темні градієнти підкреслюють яскравість фотографій та мокапів.
              </li>
            </ul>
          </section>
        </div>
      </article>
    );
  }

  return (
    <article className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-300">
      <div className="border-b border-neutral-800 pb-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-400 mb-4">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Comprehensive Design & SEO Guide</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
          The Ultimate Guide to Creating High-Conversion Photo Collages & SaaS Mockups
        </h2>
        <p className="text-sm text-neutral-400">
          Updated for 2026 • Best practices for social engagement, visual hierarchy, and multi-format publishing.
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed">
        <section>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            1. Why Visual Collages Outperform Single Images in 2026
          </h3>
          <p>
            In modern social feeds like X, LinkedIn, and Instagram, user attention spans average less than 1.5 seconds.
            A multi-photo collage or asymmetrical <strong>Bento grid layout</strong> creates depth and visual storytelling by showing
            multiple angles, features, or stages in a single high-density asset.
          </p>
          <p>
            For software developers and creators, displaying an app UI alongside key metric badges (e.g. <em>+142% MRR</em> or <em>5.0 Star Rating</em>)
            combines tangible product proof with social validation, significantly boosting click-through rates (CTR).
          </p>
        </section>

        <section>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            2. Core Principles of Balanced Collage Composition
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>
              <strong>Hero Emphasis:</strong> Avoid dividing the canvas into completely equal boring boxes when showcasing products.
              Use a dominant 60% hero cell for the primary screenshot, supported by 2–4 smaller satellite details.
            </li>
            <li>
              <strong>Consistent Padding & Corner Radii:</strong> Maintaining an outer border gap (16px–24px) with gentle rounded corners (12px–20px)
              gives your graphic an immediate premium, polished feel.
            </li>
            <li>
              <strong>High-Contrast Backdrops:</strong> Deep mesh gradients (such as dark slate to royal purple) make screenshots stand out
              while preventing eye fatigue on OLED screens.
            </li>
            <li>
              <strong>Non-Destructive Aspect Preservation:</strong> Always crop intelligently so important headers and dashboard metrics are never clipped.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            3. Optimal Aspect Ratios for Social Media & Marketing
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-neutral-800 rounded-xl overflow-hidden">
              <thead className="bg-neutral-900 text-neutral-200 uppercase font-semibold">
                <tr>
                  <th className="p-3 border-b border-neutral-800">Platform</th>
                  <th className="p-3 border-b border-neutral-800">Ratio</th>
                  <th className="p-3 border-b border-neutral-800">Best Resolution</th>
                  <th className="p-3 border-b border-neutral-800">Ideal Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 bg-neutral-950/40">
                <tr>
                  <td className="p-3 font-medium text-white">Instagram Feed</td>
                  <td className="p-3 font-mono text-indigo-400">4:5 / 1:1</td>
                  <td className="p-3 font-mono">1080 × 1350 px</td>
                  <td className="p-3">Maximum vertical feed real estate</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Stories & Reels</td>
                  <td className="p-3 font-mono text-indigo-400">9:16</td>
                  <td className="p-3 font-mono">1080 × 1920 px</td>
                  <td className="p-3">Full-screen mobile storytelling</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Twitter / X & LinkedIn</td>
                  <td className="p-3 font-mono text-indigo-400">16:9</td>
                  <td className="p-3 font-mono">1920 × 1080 px</td>
                  <td className="p-3">SaaS launches & traction graphics</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Dribbble & Portfolio</td>
                  <td className="p-3 font-mono text-indigo-400">4:3</td>
                  <td className="p-3 font-mono">1600 × 1200 px</td>
                  <td className="p-3">UI/UX case study presentation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </article>
  );
};
