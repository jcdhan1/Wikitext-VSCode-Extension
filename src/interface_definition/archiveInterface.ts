/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Rowe Wilson Frederisk Holme. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { u, o, r, cast, uncast, TypeMap } from "./convertFunction";

// https://archive.org/help/wayback_api.php

/*
    ArchiveResult {
        archivedSnapshots: ArchivedSnapshots {
            closest?: Closest {
                available: boolean,
                url: string,
                timestamp: string,
                status: string
            }
        },
        url?: string
    }
 */

export interface ArchiveResult {
    archivedSnapshots: ArchivedSnapshots;
    url?: string;
}

export interface ArchivedSnapshots {
    closest?: Closest;
}

export interface Closest {
    available: boolean;
    url: string;
    timestamp: string;
    status: string;
}

export class ArchiveConvert {
    public static toArchiveResult(json: unknown): ArchiveResult {
        return cast(json, r("ArchiveResult"), archiveTypeMap);
    }

    public static archiveResultToJson(value: ArchiveResult): unknown {
        return uncast(value, r("ArchiveResult"), archiveTypeMap);
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
const archiveTypeMap: TypeMap = {
    "ArchiveResult": o([
        { json: "archived_snapshots", js: "archivedSnapshots", typ: r("ArchivedSnapshots") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], false),
    "ArchivedSnapshots": o([
        { json: "closest", js: "closest", typ: u(undefined, r("Closest")) },
    ], false),
    "Closest": o([
        { json: "available", js: "available", typ: true },
        { json: "url", js: "url", typ: "" },
        { json: "timestamp", js: "timestamp", typ: "" },
        { json: "status", js: "status", typ: "" },
    ], false),
};
