import { default as turfDistance } from '@turf/distance';
import { default as turfDestination } from '@turf/destination';

import type { FilterSpecification, Level } from './Types';
import type { BBox, Position } from 'geojson';
import type { LngLat } from 'mapbox-gl';

export const EarthRadius = 6371008.8;

export function overlap(bounds1: BBox, bounds2: BBox) {

    // If one rectangle is on left side of other
    if (bounds1[0] > bounds2[2] || bounds2[0] > bounds1[2]) {
        return false;
    }

    // If one rectangle is above other
    if (bounds1[3] < bounds2[1] || bounds2[3] < bounds1[1]) {
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


export function destinationPoint(start: LngLat, distance: number, bearing: number): Position {
    return turfDestination(start.toArray(), distance, bearing).geometry.coordinates;
}

export function distance(point1: LngLat, point2: LngLat): number {
    return turfDistance(point1.toArray(), point2.toArray());
}

export function bboxCenter(bbox: BBox): Position {
    const [west, south, east, north] = bbox;
    return [(west + east) / 2, (south + north) / 2];
}

export function bboxContains(bbox: BBox, point: Position): Boolean {
    const [west, south, east, north] = bbox;
    const [lng, lat] = point;

    const containsLatitude = south <= lat && lat <= north;
    let containsLongitude = west <= lng && lng <= east;
    if (west > east) {
        containsLongitude = west >= lng && lng >= east;
    }

    return containsLatitude && containsLongitude;
}