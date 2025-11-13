import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';

registerBlockType('nevo/cta', {
  edit: ({ attributes, setAttributes }) => {
    const { heading, text, buttonText, buttonUrl, backgroundColor } = attributes;

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Ustawienia CTA', 'nevo')}>
            <TextControl
              label={__('URL przycisku', 'nevo')}
              value={buttonUrl}
              onChange={(value) => setAttributes({ buttonUrl: value })}
            />
            <SelectControl
              label={__('Kolor tła', 'nevo')}
              value={backgroundColor}
              options={[
                { label: 'Granat', value: 'primary' },
                { label: 'Beż', value: 'beige' },
                { label: 'Akcent', value: 'accent' },
              ]}
              onChange={(value) => setAttributes({ backgroundColor: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div className={`nevo-cta nevo-cta--${backgroundColor}`}>
          <RichText
            tagName="h2"
            className="nevo-cta__heading"
            value={heading}
            onChange={(value) => setAttributes({ heading: value })}
            placeholder={__('Nagłówek CTA...', 'nevo')}
          />

          <RichText
            tagName="p"
            className="nevo-cta__text"
            value={text}
            onChange={(value) => setAttributes({ text: value })}
            placeholder={__('Tekst CTA...', 'nevo')}
          />

          <RichText
            tagName="span"
            className="nevo-cta__button"
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
            placeholder={__('Tekst przycisku...', 'nevo')}
          />
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { heading, text, buttonText, buttonUrl, backgroundColor } = attributes;

    return (
      <div className={`nevo-cta nevo-cta--${backgroundColor}`}>
        <h2 className="nevo-cta__heading">{heading}</h2>
        <p className="nevo-cta__text">{text}</p>
        <a href={buttonUrl} className="nevo-cta__button">
          {buttonText}
        </a>
      </div>
    );
  },
});