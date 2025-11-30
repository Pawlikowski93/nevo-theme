import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.css';
import './style.css';

registerBlockType('nevo/hero', {
  edit: ({ attributes, setAttributes }) => {
    const { 
      trustBadge, 
      headline, 
      tagline, 
      subheading, 
      caseStat, 
      caseDetail, 
      buttonText, 
      buttonUrl, 
      backgroundImage 
    } = attributes;

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Ustawienia Hero', 'nevo')}>
            <TextControl
              label={__('URL przycisku', 'nevo')}
              value={buttonUrl}
              onChange={(value) => setAttributes({ buttonUrl: value })}
            />
            <MediaUpload
              onSelect={(media) => setAttributes({ backgroundImage: media.url })}
              type="image"
              value={backgroundImage}
              render={({ open }) => (
                <Button onClick={open} variant="secondary">
                  {backgroundImage ? __('Zmień grafikę hero', 'nevo') : __('Wybierz grafikę hero', 'nevo')}
                </Button>
              )}
            />
          </PanelBody>
        </InspectorControls>

        <div className="nevo-hero">
          <div className="nevo-hero__content">
            
            {/* Trust Badge */}
            <RichText
              tagName="p"
              className="trust-badge"
              value={trustBadge}
              onChange={(value) => setAttributes({ trustBadge: value })}
              placeholder={__('Trust badge...', 'nevo')}
            />

            {/* Headline */}
            <RichText
              tagName="h1"
              className="hero-headline"
              value={headline}
              onChange={(value) => setAttributes({ headline: value })}
              placeholder={__('Wpisz nagłówek...', 'nevo')}
            />

            {/* Tagline */}
            <RichText
              tagName="p"
              className="hero-tagline"
              value={tagline}
              onChange={(value) => setAttributes({ tagline: value })}
              placeholder={__('Tagline...', 'nevo')}
            />

            {/* Subheadline */}
            <RichText
              tagName="p"
              className="hero-subheadline"
              value={subheading}
              onChange={(value) => setAttributes({ subheading: value })}
              placeholder={__('Subheadline...', 'nevo')}
            />

            {/* Case Study Box */}
            <div className="hero-right">
            <div className="case-study-box">
            <RichText
              tagName="p"
              className="case-stat"
              value={caseStat}
              onChange={(value) => setAttributes({ caseStat: value })}
              placeholder={__('Statystyka...', 'nevo')}
            />

              <RichText
                tagName="span"
                className="stat-detail"
                value={caseDetail}
                onChange={(value) => setAttributes({ caseDetail: value })}
                placeholder={__('Szczegóły case study...', 'nevo')}
              />
            </div>

            {/* CTA Button */}
            <div className="hero-cta">
              <RichText
                tagName="span"
                className="cta-primary"
                value={buttonText}
                onChange={(value) => setAttributes({ buttonText: value })}
                placeholder={__('Tekst przycisku...', 'nevo')}
              />
            </div>

            {/* Benefit Points */}
            <ul className="hero-benefits">
              <li>✓ Odpowiedź w ciągu 24 godzin</li>
              <li>✓ Video call lub telefon – jak wolisz</li>
              <li>✓ Bez zobowiązań</li>
            </ul>

          </div>
        </div>
          {/* Hero Graphic */}
          {backgroundImage && (
            <div className="hero-graphic">
              <img src={backgroundImage} alt="NEVO Hero" />
            </div>
          )}
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { 
      trustBadge, 
      headline, 
      tagline, 
      subheading, 
      caseStat, 
      caseDetail, 
      buttonText, 
      buttonUrl, 
      backgroundImage 
    } = attributes;

    return (
      <section className="nevo-hero">
        <div className="nevo-hero__content">
          
          <p className="trust-badge">{trustBadge}</p>
          
          <h1 className="hero-headline">{headline}</h1>
          
          <p className="hero-tagline">{tagline}</p>
          
          <p className="hero-subheadline">{subheading}</p>
        <div className="hero-right">  
        <div className="case-study-box">
          <p className="case-stat">
            <strong>{caseStat}</strong>
            <span className="stat-detail">{caseDetail}</span>
          </p>
        </div>
          
          <div className="hero-cta">
            <a href={buttonUrl} className="cta-primary">
              {buttonText}
            </a>
          </div>
          
          <ul className="hero-benefits">
            <li>✓ Odpowiedź w ciągu 24 godzin</li>
            <li>✓ Video call lub telefon – jak wolisz</li>
            <li>✓ Bez zobowiązań</li>
          </ul>
          
        </div>
        </div>
        {backgroundImage && (
          <div className="hero-graphic">
            <img src={backgroundImage} alt="NEVO Hero" />
          </div>
        )}
      </section>
    );
  },
});