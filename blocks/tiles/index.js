import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';

registerBlockType('nevo/tiles', {
  edit: ({ attributes, setAttributes }) => {
    const { tiles } = attributes;

    const updateTile = (index, field, value) => {
      const newTiles = [...tiles];
      newTiles[index][field] = value;
      setAttributes({ tiles: newTiles });
    };

    const addTile = () => {
      setAttributes({
        tiles: [
          ...tiles,
          { title: 'Nowy kafelek', description: 'Opis', icon: 'star' },
        ],
      });
    };

    const removeTile = (index) => {
      const newTiles = tiles.filter((_, i) => i !== index);
      setAttributes({ tiles: newTiles });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Zarządzaj kafelkami', 'nevo')}>
            <Button onClick={addTile} variant="primary">
              {__('Dodaj kafelek', 'nevo')}
            </Button>
          </PanelBody>
        </InspectorControls>

        <div className="nevo-tiles">
          {tiles.map((tile, index) => (
            <div key={index} className="nevo-tile">
              <div className="nevo-tile__icon">{tile.icon}</div>
              
              <RichText
                tagName="h3"
                className="nevo-tile__title"
                value={tile.title}
                onChange={(value) => updateTile(index, 'title', value)}
                placeholder={__('Tytuł kafelka...', 'nevo')}
              />

              <RichText
                tagName="p"
                className="nevo-tile__description"
                value={tile.description}
                onChange={(value) => updateTile(index, 'description', value)}
                placeholder={__('Opis kafelka...', 'nevo')}
              />

              <Button 
                onClick={() => removeTile(index)} 
                variant="secondary" 
                isDestructive
              >
                {__('Usuń', 'nevo')}
              </Button>
            </div>
          ))}
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { tiles } = attributes;

    return (
      <div className="nevo-tiles">
        {tiles.map((tile, index) => (
          <div key={index} className="nevo-tile">
            <div className="nevo-tile__icon">{tile.icon}</div>
            <h3 className="nevo-tile__title">{tile.title}</h3>
            <p className="nevo-tile__description">{tile.description}</p>
          </div>
        ))}
      </div>
    );
  },
});