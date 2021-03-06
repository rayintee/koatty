/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-11 12:06:16
 */
import { Controller, BaseController, Autowired, Logger, Helper, RequestBody } from "../../../src/index";
import { App } from '../App';
import { CommonService } from '../service/CommonService';

@Controller()
export class AdminController extends BaseController {
    app: App;
    // Mo: { rel: false; sortby: any; field: any[]; ispage: boolean; pagesize: number; page: number; };
    // Map: any; //保存查询条件
    // Model: any; //定义模型类,用于判断数据权限
    service: any;

    @Autowired()
    protected commonService: CommonService;

    init() {
        // this.Model = null;
        // this.Mo = { rel: false, sortby: {}, field: [], ispage: true, pagesize: 20, page: 1 };
        // this.Map = {};
    }

    __before() {
        console.log('AdminController.__before', this.ctx.URL);
    }

    adminTest() {
        console.log('AdminController.adminTest()');
    }

}