import type { LngLatBounds } from 'mapbox-gl';

import type { FilterSpecification, Level } from './types';

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

export function filterWithLevel(initialFilter: FilterSpecification, level: Level): any {
    return [
        "all",
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
        ],
        initialFilter
    ];
}
