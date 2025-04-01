'use client'

import handleSlug from '@/components/handleSlug'
import {Background, ReactFlow} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {useTheme} from 'next-themes'
import Link from 'next/link'
import {useParams, useSearchParams} from 'next/navigation'

const initialNodes = [
    {
        id: '1',
        position: {x: 0, y: 150},
        data: {label: '如何阅读一本书'},
    },
    // 一级节点
    {
        id: '2',
        position: {x: 250, y: 0},
        data: {label: '关于阅读'},
    },
    {
        id: '3',
        position: {x: 250, y: 150},
        data: {label: '基础阅读'},
    },
    {
        id: '4',
        position: {x: 250, y: 300},
        data: {label: '检视阅读'},
    },
    {
        id: '5',
        position: {x: 250, y: 450},
        data: {label: '分析阅读'},
    },
    {
        id: '6',
        position: {x: 250, y: 600},
        data: {label: '主题阅读'},
    },
    {
        id: '7',
        position: {x: 250, y: 750},
        data: {label: '总结改进'},
    },
    {
        id: '8',
        position: {x: 250, y: 900},
        data: {label: '经典论述'},
    },
    // 二级节点
    {
        id: '9',
        position: {x: 500, y: 0},
        data: {label: '四大问题'},
    },
    {
        id: '10',
        position: {x: 500, y: 150},
        data: {label: '必记笔记'},
    },
    {
        id: '18',
        position: {x: 500, y: 150},
        data: {label: '特点'},
    },
    {
        id: '19',
        position: {x: 500, y: 300},
        data: {label: '目标'},
    },
    {
        id: '22',
        position: {x: 500, y: 300},
        data: {label: '略读'},
    },
    {
        id: '23',
        position: {x: 500, y: 450},
        data: {label: '快读技巧'},
    },
    {
        id: '30',
        position: {x: 500, y: 450},
        data: {label: '第一阶段'},
    },
    {
        id: '31',
        position: {x: 500, y: 600},
        data: {label: '第二阶段'},
    },
    {
        id: '32',
        position: {x: 500, y: 750},
        data: {label: '第三阶段'},
    },
    {
        id: '43',
        position: {x: 500, y: 600},
        data: {label: '准备工作'},
    },
    {
        id: '44',
        position: {x: 500, y: 750},
        data: {label: '主题阅读步骤'},
    },
    {
        id: '51',
        position: {x: 500, y: 750},
        data: {label: '实用论说性书籍'},
    },
    {
        id: '52',
        position: {x: 500, y: 900},
        data: {label: '较简单但重要的书'},
    },
    {
        id: '53',
        position: {x: 500, y: 1050},
        data: {label: '获得资讯的书'},
    },
    {
        id: '57',
        position: {x: 500, y: 900},
        data: {label: '关于阅读的艺术，增强理解力'},
    },
    {
        id: '58',
        position: {x: 500, y: 1050},
        data: {label: '现代媒体阻碍理解力'},
    },
    {
        id: '59',
        position: {x: 500, y: 1200},
        data: {label: '读好书成为智者，体认真理'},
    },
    {
        id: '60',
        position: {x: 500, y: 1350},
        data: {label: '熟练阅读的境界像滑雪'},
    },
    // 三级节点
    {
        id: '11',
        position: {x: 750, y: 0},
        data: {label: '整体来说，这本书到底在谈些什么？'},
    },
    {
        id: '12',
        position: {x: 750, y: 150},
        data: {label: '作者细部说了什么，怎么说的？'},
    },
    {
        id: '13',
        position: {x: 750, y: 300},
        data: {label: '这本书说得有道理吗？'},
    },
    {
        id: '14',
        position: {x: 750, y: 450},
        data: {label: '这本书跟你有什么关系？'},
    },
    {
        id: '15',
        position: {x: 750, y: 0},
        data: {label: '那会让你保持清醒'},
    },
    {
        id: '16',
        position: {x: 750, y: 150},
        data: {label: '阅读是一种思考，倾向于用语言表达出来'},
    },
    {
        id: '17',
        position: {x: 750, y: 300},
        data: {
            label: '将你的感想写下来，能帮助记住作者的思想；记录问题，简化书中论点，记录论点发展顺序',
        },
    },
    {
        id: '20',
        position: {x: 750, y: 150},
        data: {label: '强调时间，在规定时间内完成阅读功课'},
    },
    {
        id: '21',
        position: {x: 750, y: 300},
        data: {label: '摆脱文盲状态，顺利阅读作品'},
    },
    {
        id: '24',
        position: {x: 750, y: 300},
        data: {label: '先看书名页，有序先看序'},
    },
    {
        id: '25',
        position: {x: 750, y: 450},
        data: {label: '研究目录页，理解基本架构'},
    },
    {
        id: '26',
        position: {x: 750, y: 600},
        data: {label: '查看书中索引，评估议题范围'},
    },
    {
        id: '27',
        position: {x: 750, y: 750},
        data: {label: '阅读篇章摘要'},
    },
    {
        id: '28',
        position: {x: 750, y: 900},
        data: {label: '念书的一两段，有时连续读几页'},
    },
    {
        id: '29',
        position: {x: 750, y: 450},
        data: {label: '头一次面对难读的书，从头到尾读完一遍'},
    },
    {
        id: '33',
        position: {x: 750, y: 450},
        data: {label: '依照书本种类与主题分类'},
    },
    {
        id: '34',
        position: {x: 750, y: 600},
        data: {label: '用简短句子说出整本书在谈些什么'},
    },
    {
        id: '35',
        position: {x: 750, y: 750},
        data: {label: '列出全书重要部分纲要'},
    },
    {
        id: '36',
        position: {x: 750, y: 900},
        data: {label: '找出作者的问题或想要解决的问题'},
    },
    {
        id: '37',
        position: {x: 750, y: 1050},
        data: {label: '诠释关键字，达成共识'},
    },
    {
        id: '38',
        position: {x: 750, y: 1200},
        data: {label: '抓出重要主旨'},
    },
    {
        id: '39',
        position: {x: 750, y: 600},
        data: {label: '找出作者论述，重新架构论述因果关系'},
    },
    {
        id: '40',
        position: {x: 750, y: 750},
        data: {label: '确定作者已解决和未解决的问题'},
    },
    {
        id: '41',
        position: {x: 750, y: 750},
        data: {label: '主动阅读，提出评论和批评'},
    },
    {
        id: '42',
        position: {x: 1000, y: 750},
        data: {label: '智慧礼节、批评标准、外来辅助等'},
    },
    {
        id: '45',
        position: {x: 750, y: 600},
        data: {label: '设计试验性书目，检视相关书籍'},
    },
    {
        id: '46',
        position: {x: 750, y: 750},
        data: {label: '找到相关章节'},
    },
    {
        id: '47',
        position: {x: 750, y: 900},
        data: {label: '创造中立词汇，达成共识'},
    },
    {
        id: '48',
        position: {x: 750, y: 1050},
        data: {label: '建立中立主旨，列出问题'},
    },
    {
        id: '49',
        position: {x: 750, y: 1200},
        data: {label: '界定议题，整理不同意见'},
    },
    {
        id: '50',
        position: {x: 750, y: 1350},
        data: {label: '分析讨论，排列问题和议题'},
    },
    {
        id: '54',
        position: {x: 750, y: 750},
        data: {label: '预读、精读、处理-是什么、处理-意义'},
    },
    {
        id: '55',
        position: {x: 750, y: 900},
        data: {label: '预读、精读、处理-是什么、处理-意义'},
    },
    {
        id: '56',
        position: {x: 750, y: 1050},
        data: {label: '预读、精读、处理-是什么、处理-意义'},
    },
]

const initialEdges = [
    // 中心节点连接
    {id: 'e1-2', source: '1', target: '2'},
    {id: 'e1-3', source: '1', target: '3'},
    {id: 'e1-4', source: '1', target: '4'},
    {id: 'e1-5', source: '1', target: '5'},
    {id: 'e1-6', source: '1', target: '6'},
    {id: 'e1-7', source: '1', target: '7'},
    {id: 'e1-8', source: '1', target: '8'},

    // 一级节点连接
    {id: 'e2-9', source: '2', target: '9'},
    {id: 'e2-10', source: '2', target: '10'},
    {id: 'e3-18', source: '3', target: '18'},
    {id: 'e3-19', source: '3', target: '19'},
    {id: 'e4-22', source: '4', target: '22'},
    {id: 'e4-23', source: '4', target: '23'},
    {id: 'e5-30', source: '5', target: '30'},
    {id: 'e5-31', source: '5', target: '31'},
    {id: 'e5-32', source: '5', target: '32'},
    {id: 'e6-43', source: '6', target: '43'},
    {id: 'e6-44', source: '6', target: '44'},
    {id: 'e7-51', source: '7', target: '51'},
    {id: 'e7-52', source: '7', target: '52'},
    {id: 'e7-53', source: '7', target: '53'},
    {id: 'e8-57', source: '8', target: '57'},
    {id: 'e8-58', source: '8', target: '58'},
    {id: 'e8-59', source: '8', target: '59'},
    {id: 'e8-60', source: '8', target: '60'},

    // 二级节点连接
    {id: 'e9-11', source: '9', target: '11'},
    {id: 'e9-12', source: '9', target: '12'},
    {id: 'e9-13', source: '9', target: '13'},
    {id: 'e9-14', source: '9', target: '14'},
    {id: 'e10-15', source: '10', target: '15'},
    {id: 'e10-16', source: '10', target: '16'},
    {id: 'e10-17', source: '10', target: '17'},
    {id: 'e18-20', source: '18', target: '20'},
    {id: 'e19-21', source: '19', target: '21'},
    {id: 'e22-24', source: '22', target: '24'},
    {id: 'e22-25', source: '22', target: '25'},
    {id: 'e22-26', source: '22', target: '26'},
    {id: 'e22-27', source: '22', target: '27'},
    {id: 'e22-28', source: '22', target: '28'},
    {id: 'e23-29', source: '23', target: '29'},
    {id: 'e30-33', source: '30', target: '33'},
    {id: 'e30-34', source: '30', target: '34'},
    {id: 'e30-35', source: '30', target: '35'},
    {id: 'e30-36', source: '30', target: '36'},
    {id: 'e30-37', source: '30', target: '37'},
    {id: 'e30-38', source: '30', target: '38'},
    {id: 'e31-39', source: '31', target: '39'},
    {id: 'e31-40', source: '31', target: '40'},
    {id: 'e32-41', source: '32', target: '41'},
    {id: 'e43-45', source: '43', target: '45'},
    {id: 'e44-46', source: '44', target: '46'},
    {id: 'e44-47', source: '44', target: '47'},
    {id: 'e44-48', source: '44', target: '48'},
    {id: 'e44-49', source: '44', target: '49'},
    {id: 'e44-50', source: '44', target: '50'},
    {id: 'e51-54', source: '51', target: '54'},
    {id: 'e52-55', source: '52', target: '55'},
    {id: 'e53-56', source: '53', target: '56'},

    // 三级节点连接
    {id: 'e41-42', source: '41', target: '42'},
]

export default function Mind() {
    const {resolvedTheme} = useTheme()
    const {slug = []} = useParams<{slug?: string[]}>()
    const {title, type} = handleSlug(slug)
    const searchParams = useSearchParams()
    const url = `/book/books/${type}/${title}.${searchParams.get('oldFileType')}?hasMind=1`

    return (
        <div className="flex flex-col h-full">
            <div className="max-sm:m-2 min-sm:m-5">
                <Link href={url}>返回</Link>
            </div>
            <ReactFlow
                fitView
                className="flex-1"
                defaultNodes={initialNodes}
                defaultEdges={initialEdges}
                attributionPosition="top-right"
                colorMode={resolvedTheme as 'light' | 'dark'}
            >
                <Background />
            </ReactFlow>
        </div>
    )
}
