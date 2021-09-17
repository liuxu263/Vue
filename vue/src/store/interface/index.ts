export interface user {
    userInfo: Array<object>;
}
export interface App {
    count: 0;
}

// 布局配置
export interface ThemeConfigState {
    globalTitle: string;
    layout: string;
    menuBar: string;
    animation: string;
    isFixedHeader: boolean;
    isCollapse: boolean;
    isShowLogo: boolean;
    isBreadcrumb: boolean// 是否开启 Breadcrumb
    isBreadcrumbIcon: boolean, // 是否开启 Breadcrumb 图标
    isCacheTagsView: boolean, // 是否开启 TagsView 缓存
}

export interface RoutesListState {
    routesList: Array<object>;
}

export interface TagsViewRoutesState {
    tagsViewRoutes: Array<object>;
}

// 主接口（顶级类型声明）
export interface RootStateTypes {
    user: user
    themeConfig: ThemeConfigState;
    app: App;
    routesList: RoutesListState;
    tagsViewRoutes: TagsViewRoutesState;
}


