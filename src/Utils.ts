import type { FilterSpecification, Level } from './types';
import type { BBox2d } from '@mapbox/geojson-types';

export const EarthRadius = 6371008.8;

export function overlap(bounds1: BBox2d, bounds2: BBox2d) {

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
