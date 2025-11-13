import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';

registerBlockType('nevo/hero', {
  edit: ({ attributes, setAttributes }) => {
    const { heading, subheading, buttonText, buttonUrl, backgroundImage } = attributes;

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
                  {backgroundImage ? __('Zmień tło', 'nevo') : __('Wybierz tło', 'nevo')}
                </Button>
              )}
            />
          </PanelBody>
        </InspectorControls>

        <div 
          className="nevo-hero" 
          style={{ 
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' 
          }}
        >
          <div className="nevo-hero__content">
            <RichText
              tagName="h1"
              className="nevo-hero__heading"
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              placeholder={__('Wpisz nagłówek...', 'nevo')}
            />

            <RichText
              tagName="p"
              className="nevo-hero__subheading"
              value={subheading}
              onChange={(value) => setAttributes({ subheading: value })}
              placeholder={__('Wpisz podtytuł...', 'nevo')}
            />

            <RichText
              tagName="span"
              className="nevo-hero__button"
              value={buttonText}
              onChange={(value) => setAttributes({ buttonText: value })}
              placeholder={__('Tekst przycisku...', 'nevo')}
            />
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { heading, subheading, buttonText, buttonUrl, backgroundImage } = attributes;

    return (
      <div 
        className="nevo-hero" 
        style={{ 
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' 
        }}
      >
        <div className="nevo-hero__content">
          <h1 className="nevo-hero__heading">{heading}</h1>
          <p className="nevo-hero__subheading">{subheading}</p>
          <a href={buttonUrl} className="nevo-hero__button">
            {buttonText}
          </a>
        </div>
      </div>
    );
  },
});