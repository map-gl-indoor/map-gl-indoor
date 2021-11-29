import IndoorLayer from './IndoorLayer';
import IndoorMap from './IndoorMap';

import type { Map as MapboxMap } from 'mapbox-gl';
import type { Level, MapboxMapWithIndoor } from './Types';

/**
 * Creates a indoor control with floors buttons

 * @implements {IControl}
 */
class IndoorControl {

    _map?: MapboxMapWithIndoor;
    _indoor?: IndoorLayer;
    _indoorMap: IndoorMap | null;

    _container?: HTMLElement;
    _levelsButtons: Array<HTMLElement>;
    _selectedButton: HTMLElement | null;

    constructor() {
        this._levelsButtons = [];
        this._selectedButton = null;
        this._indoorMap = null;
    }

    onAdd(map: MapboxMap | MapboxMapWithIndoor) {

        if ((map as MapboxMapWithIndoor).indoor === undefined) {
            throw Error('call addIndoorTo(map) before creating the IndoorControl');
        }

        this._map = map as MapboxMapWithIndoor;
        this._indoor = this._map.indoor;

        // Create container
        const container = this._container = document.createElement("div");
        container.classList.add("mapboxgl-ctrl");
        container.classList.add("mapboxgl-ctrl-group");
        container.style.display = 'none';
        container.addEventListener('contextmenu', this._onContextMenu);

        // If indoor layer is already loaded, update levels
        this._indoorMap = this._indoor.getSelectedMap();
        if (this._indoor.getSelectedMap() !== null) {
            this._updateNavigationBar()
            this._setSelected(this._indoor.getLevel());
        }

        // Register to indoor events
        map.on('indoor.map.loaded', this._onMapLoaded);
        map.on('indoor.map.unloaded', this._onMapUnLoaded);
        map.on('indoor.level.changed', this._onLevelChanged);

        return container;
    }

    onRemove() {
        this._container?.removeEventListener('contextmenu', this._onContextMenu);
        this._container?.remove();
        delete this._container;

        this._map?.off('indoor.map.loaded', this._onMapLoaded);
        this._map?.off('indoor.map.unloaded', this._onMapUnLoaded);
        this._map?.off('indoor.level.changed', this._onLevelChanged);
        delete this._map;
    }

    _onMapLoaded = ({ indoorMap }: { indoorMap: IndoorMap }): void => {
        this._indoorMap = indoorMap;
        this._updateNavigationBar();
        this._setSelected(this._indoor!.getLevel());
    }

    _onMapUnLoaded = (): void => {
        this._indoorMap = null;
        this._updateNavigationBar();
    }

    _onLevelChanged = ({ level }: { level: Level | null }): void => this._setSelected(level);

    _updateNavigationBar() {

        if (!this._container) {
            return;
        }

        if (this._indoorMap === null) {
            this._container.style.display = 'none';
            return;
        }

        this._container.style.display = 'block';

        this._levelsButtons = [];
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }

        const range = this._indoorMap.levelsRange;
        for (let i = range.max; i >= range.min; i--) {
            this._levelsButtons[i] = this._createLevelButton(this._container, i);
        }
    }

    _setSelected(level: Level | null) {

        if (this._levelsButtons.length === 0) {
            return;
        }

        if (this._selectedButton) {
            this._selectedButton.style.fontWeight = "normal";
        }
        if (level !== null && this._levelsButtons[level]) {
            this._levelsButtons[level].style.fontWeight = "bold";
            this._selectedButton = this._levelsButtons[level];
        }
    }

    _createLevelButton(container: HTMLElement, level: Level) {
        const a = document.createElement("button");
        a.innerHTML = level.toString();
        a.classList.add("mapboxgl-ctrl-icon");
        container.appendChild(a);
        a.addEventListener('click', () => {
            this._map?.fire('indoor.control.clicked', { level });
            if (this._indoor!.getLevel() === level) return;
            this._indoor!.setLevel(level);
        });
        return a;
    }

    _onContextMenu(e: Event) {
        e.preventDefault();
    }

}

export default IndoorControl;
