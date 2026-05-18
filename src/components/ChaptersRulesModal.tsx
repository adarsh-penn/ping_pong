import { useEffect } from 'react';
import { RULEBOOK_CHAPTERS } from '../data/rulebookChapters';

interface ChaptersRulesModalProps {
  onClose: () => void;
}

export function ChaptersRulesModal({ onClose }: ChaptersRulesModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="rules-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-modal-title"
    >
      <button
        type="button"
        className="rules-modal__backdrop"
        aria-label="Close chapters and rules"
        onClick={onClose}
      />
      <div className="rules-modal__panel">
        <header className="rules-modal__header">
          <div>
            <h2 id="rules-modal-title" className="rules-modal__title">
              Chapters and Rules
            </h2>
            <p className="rules-modal__subtitle">
              The Custom Bing Bong Rulebook
            </p>
          </div>
          <button
            type="button"
            className="rules-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="rules-modal__body">
          {RULEBOOK_CHAPTERS.map((chapter) => (
            <section key={chapter.id} className="rules-chapter">
              <p className="rules-chapter__label">{chapter.chapter}</p>
              <h3 className="rules-chapter__title">{chapter.title}</h3>
              {chapter.intro ? (
                <p className="rules-chapter__intro">{chapter.intro}</p>
              ) : null}

              {chapter.sections.map((section) => (
                <article key={section.title} className="rules-section">
                  <h4 className="rules-section__title">{section.title}</h4>
                  {section.intro ? (
                    <p className="rules-section__intro">{section.intro}</p>
                  ) : null}
                  <ul className="rules-section__list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {section.subsections?.map((sub) => (
                    <div key={sub.title} className="rules-subsection">
                      <h5 className="rules-subsection__title">{sub.title}</h5>
                      <ul className="rules-section__list">
                        {sub.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
