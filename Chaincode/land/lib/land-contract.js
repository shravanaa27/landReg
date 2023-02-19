/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class LandContract extends Contract {

    async landExists(ctx, landId) {
        const buffer = await ctx.stub.getState(landId);
        return (!!buffer && buffer.length > 0);
    }

    async createLand(ctx, landId, value) {
        const exists = await this.landExists(ctx, landId);
        if (exists) {
            throw new Error(`The land ${landId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(landId, buffer);
    }

    async readLand(ctx, landId) {
        const exists = await this.landExists(ctx, landId);
        if (!exists) {
            throw new Error(`The land ${landId} does not exist`);
        }
        const buffer = await ctx.stub.getState(landId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateLand(ctx, landId, newValue) {
        const exists = await this.landExists(ctx, landId);
        if (!exists) {
            throw new Error(`The land ${landId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(landId, buffer);
    }

    async deleteLand(ctx, landId) {
        const exists = await this.landExists(ctx, landId);
        if (!exists) {
            throw new Error(`The land ${landId} does not exist`);
        }
        await ctx.stub.deleteState(landId);
    }

}

module.exports = LandContract;
