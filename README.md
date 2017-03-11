# Git学习手记

## Git简介
Git是目前常用的版本管理工具之一。它在2005由Linus Torvalds和Linux开源社区开发。开发的目的是高效管理Linux内核这种超大规模项目。

相对来说，Git只关心文件数据的整体。它把需要变化的文件做快照后记录在一个微型的文件系统中。每次提交更新时Git会总览一遍所有文件的指纹信息，并对文件做快照，然后保存一个指向这次快照的索引。如果文件没有变化，则只对上次保存的快照做链接。

Git的大多数操作都在本地，比如提交变更、浏览变更记录、比较不同版本差异等操作都无需联网至远程服务器。因此你可以尽情的在动车上码代码，等下了车再提交🌚

Git操作大多仅仅是把数据添加到数据库。因此一旦提交快照之后就完全不用担心丢失数据。

>快照是指某个文件在某一具体时刻的可用镜像
>指纹是指Git对某文件或目录计算得到的SHA-1哈希值

对于Git来说，文件有已跟踪（tracked）和未跟踪（untracked）两种。tracked文件是指被纳入Git管理的文件；其他文件就属于untracked。tracked文件又分为三种状态：已提交（committed），已修改（modified）和已暂存（staged）。committed表示该文件已经被安全地保存在本地数据库中了；modified表示修改了某个文件，但还没有提交保存；staged表示把已修改的文件放在下次提交时要保存的清单中。

由此我们看到 Git 管理项目时，文件流转的三个工作区域：Git 的工作目录，暂存区域，以及本地仓库。

## Git的配置
安装好Git后，还需要简单的配置一下：
```cli
$ git config --global user.name yourname  #配置用户名
$ git config --global user.email youremail  #配置用户邮箱
$ git config --global push.default simple #只推送本地当前分支
$ git config --global core.quotepath false #防止中文路径被转义
$ git config --global core.editor vim #指定编辑提交信息所用的编辑器
$ git config --global merge.tool vimdiff  #指定差异分析工具
```
如果忘记了自己的配置，可以通过`git config --list`查看。

>有些人在Github上遇到了提交但却不刷绿的情况，大多数情况下都是因为没有正确的配置用户名和邮箱

## Git基本操作
Git的大多数操作都需要在仓库中进行。可以在工作目录下通过`git init`命令创建仓库，也可以通过`git clone [url] [name]`命令克隆一个远程仓库。

>克隆的仓库会包括该项目的所有历史数据

在仓库中新建文件后需要通过`git add path`命令将新建文件纳入Git跟踪。此时该文件的状态为staged；
将staged状态的文件再次修改，该文件状态变为modified；
执行`git commit`命令可以提交staged状态的文件，提交后文件状态变更为committed。

可以看出，在add后修改文件再commit，是不会提交add之后的变更的。所以commit前应该通过`git status`查看文件状态，确保变更已被纳入暂存区。
也可以通过在提交命令中添加参数a的方式通知Git将所有tracked的文件全部纳入暂存区：`git commit -a`。

有些文件我们并不想纳入Git追踪，但又不想删除它们，比如说日志文件、node_modules等。可以通过添加`.gitignore`忽略指定文件：
```
#Git会忽略注释行
*.log   #忽略所有.log结尾的文件
!update.log    #除了update.log
node_modules/   #忽略node_modules/目录下的所有文件
```
提交之后可以通过`git log`查看提交历史：
```
commit ca61730da28e71d2a31d69ea6bf39851f8b25ee0
Author: hengg <user@example.com>
Date:   Fri Mar 3 20:53:17 2017 +0800

    学习Git如何使用
```
```
$ git init  #创建一个仓库
$ git clone [url] [name]  #获取远程仓库，name为可选，用于命名文件夹

$ git add README.md #将文件纳入Git
$ git commit -m '添加README.md'   #提交变更

$ git status #查看文件状态
```

