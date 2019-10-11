/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-10-11 09:34:59
 */

import KoaRouter from 'koa-router';
import * as Koa from 'koa';
import * as helper from "think_lib";
import * as logger from "think_logger";
import { CONTROLLER_KEY } from '../core/Constants';
import { Middleware } from '../core/Decorators';

const defaultOpt = {
    //默认配置项
    prefix: ''
};

@Middleware()
export class Router {
    run(options: any, app: any) {
        options = helper.extend(defaultOpt, options);
        app.once('appReady', () => {
            try {
                const kRouter: any = new KoaRouter(options);
                helper.define(app, 'Router', kRouter);
                const controllers = app._caches.controllers || {};
                // tslint:disable-next-line: one-variable-per-declaration
                let ctl: any, ctlRouters: [], ctlParams: any;
                // tslint:disable-next-line: forin
                for (const n in controllers) {
                    ctlRouters = controllers[n].prototype.options.router || [];
                    ctlParams = controllers[n].prototype.options.params || {};
                    ctlRouters.map((it: any) => {
                        // logger.custom('think', '', `=> register request mapping = ${it.requestMethod} : ${it.path} -> ${n}.${it.method}`);
                        app.Router[it.requestMethod](it.path, (ctx: Koa.Context) => {
                            ctl = app.Container.get(n, CONTROLLER_KEY);
                            // inject ctx 
                            ctl.ctx = ctx;
                            // inject param
                            let args = [];
                            if (ctlParams[it.method]) {
                                args = ctlParams[it.method].sort((a: any, b: any) => a.index - b.index).map((i: any) => i.fn(ctx, i.type));
                            }
                            ctl[it.method](...args);
                        });
                    });
                }

                app.use(app.Router.routes()).use(app.Router.allowedMethods());
            } catch (err) {
                logger.error(err);
            }
        });
        return function (ctx: Koa.Context, next: any) {
            return next();
        };
    }
}