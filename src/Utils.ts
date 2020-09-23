import { LngLat, LngLatBounds } from 'mapbox-gl';

import type { FilterSpecification, Level } from './types';

export const EarthRadius = 6371008.8;

export function overlap(bounds1: LngLatBounds, bounds2: LngLatBounds) {

    // If one rectangle is on left side of other
    if (bounds1.getWest() > bounds2.getEast() || bounds2.getWest() > bounds1.getEast()) {
        return false;
    }

    // If one rectangle is above other
    if (bounds1.getNorth() < bounds2.getSouth() || bounds2.getNorth() < bounds1.getSouth()) {
        return false;
    }

    return true;
}

export function filterWithLevel(initialFilter: FilterSpecification, level: Level, showFeaturesWithEmptyLevel: boolean = false): any {
    return [
        "all",
        initialFilter,
        [
            'any',
            showFeaturesWithEmptyLevel ? ["!", ["has", "level"]] : false,
            [
                'all',
                [
                    "has",
                    "level"
                ],
                [
                    "any",
                    [
                        "==",
                        ["get", "level"],
                        level.toString()
                    ],
                    [
                        "all",
                        [
                            "!=",
                            [
                                "index-of",
                                ";",
                                ["get", "level"]
                            ],
                            -1,
                        ],
                        [
                            ">=",
                            level,
                            [
                                "to-number",
                                [
                                    "slice",
                                    ["get", "level"],
                                    0,
                                    [
                                        "index-of",
                                        ";",
                                        ["get", "level"]
                                    ]
                                ]
                            ]
                        ],
                        [
                            "<=",
                            level,
                            [
                                "to-number",
                                [
                                    "slice",
                                    ["get", "level"],
                                    [
                                        "+",
                                        [
                                            "index-of",
                                            ";",
                                            ["get", "level"]
                                        ],
                                        1
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ];
}


export function distance(point1: LngLat, point2: LngLat) : number {

    const lat1 = point1.lat / 180 * Math.PI;
    const lng1 = point1.lng / 180 * Math.PI;

    const lat2 = point2.lat / 180 * Math.PI;
    const lng2 = point2.lng / 180 * Math.PI;

    const dlat = lat2 - lat1;
    const dlng = lng2 - lng1;

    const angle = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) ** 2;

    const tangy = Math.sqrt(angle);
    const tangx = Math.sqrt(1 - angle);
    const cosn = 2 * Math.atan2(tangy, tangx);

    return EarthRadius * cosn;
}
