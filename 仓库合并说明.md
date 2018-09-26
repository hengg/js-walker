## 仓库合并说明

```bash
# clone 源仓库和目标仓库 
git clone source/target
# 切换至目标仓库 
cd target/repo
#将 source 作为 remote server 添加至target repo 内 
git remote add -f source  /fullpath/to/source/repo
# 合并 source 和 target
git merge --strategy ours --no-commit React-Learning/master --allow-unrelated-histories
# 创建子目录
mkdir -p source
# read-tree
git read-tree --prefix=source/ -u source-repo/master
# 迁移完成,提交
git add --all
git commit --message '迁移完成'
```

*参考: [如何用 Git 合并两个库](https://segmentfault.com/a/1190000000678808)*