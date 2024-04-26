const base = {
    get() {
        return {
            url : "http://localhost:8080/djangoty10908c/",
            name: "djangoty10908c",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于Hadoop的电影推荐系统的设计与实现"
        } 
    }
}
export default base
