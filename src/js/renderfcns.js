import { h } from 'vue'

export const renderDirectElementMap = (element, tagName) => {
  return {
    components: {
      DirectElementMap: () =>
        import('../components/templates/DirectElementMap.vue'),
    },
    render() {
      return h('DirectElementMap', {
        props: {
          element,
          tagName,
        },
      })
    },
  }
}

export const renderWarning = (element, level) => {
  return {
    components: {
      Admonition: () => import('../components/templates/Admonition.vue'),
    },
    render() {
      return h('Admonition', {
        props: {
          element,
          level
        },
      })
    },
  }
}

export const renderSection = (element, level, extraIds) => {
  return {
    components: {
      Section: () => import('../components/templates/Section.vue'),
    },
    render() {
      return h('Section',
        {
          level,
          element,
          extraIds,
        },
      )
    },
  }
}

export const renderTitle = (element, level, isTopic) => {
  return {
    components: {
      Title: () => import('../components/templates/Title.vue'),
    },
    render() {
      return h(
        'Title',
        {
          props: {
            element,
            level,
            isTopic,
          },
        },
        [element.innerText || element.textContent],
      )
    },
  }
}

export const renderPlainText = text => {
  return {
    render() {
      return this._v(text)
    },
  }
}

export const renderTransition = () => {
  return {
    render() {
      return h(
        'hr', // tag name
        { class: ['docutils'] },
      )
    },
  }
}

export const renderMath = element => {
  return {
    components: {
      Math: () => import('../components/templates/Math.vue'),
    },
    render() {
      return h('Math', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderLineSingle = element => {
  return {
    components: {
      LineSingle: () => import('../components/templates/LineSingle.vue'),
    },
    render() {
      return h('LineSingle', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderLineBlock = element => {
  return {
    components: {
      LineBlock: () => import('../components/templates/LineBlock.vue'),
    },
    render() {
      return h('LineBlock', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderLiteralBlock = element => {
  return {
    components: {
      LiteralBlock: () => import('../components/templates/LiteralBlock.vue'),
    },
    render() {
      return h('LiteralBlock', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderLiteral = element => {
  return {
    components: {
      Literal: () => import('../components/templates/Literal.vue'),
    },
    render() {
      return h('Literal', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderMathBlock = element => {
  return {
    components: {
      MathBlock: () => import('../components/templates/MathBlock.vue'),
    },
    render() {
      return h('MathBlock', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderAdmonition = element => {
  return {
    components: {
      Admonition: () => import('../components/templates/Admonition.vue'),
    },
    render() {
      return h('Admonition', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderProblematic = element => {
  return {
    components: {
      Problematic: () => import('../components/templates/Problematic.vue'),
    },
    render() {
      return h('Problematic', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderNote = element => {
  return {
    components: {
      Note: () => import('../components/templates/Note.vue'),
    },
    render() {
      return h('Note', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderTodoNode = element => {
  return {
    components: {
      TodoNode: () => import('../components/templates/TodoNode.vue'),
    },
    render() {
      return h('TodoNode', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderReference = element => {
  return {
    components: {
      Reference: () => import('../components/templates/Reference.vue'),
    },
    render() {
      return h('Reference', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderNumberReference = element => {
  return {
    components: {
      NumberReference: () =>
        import('../components/templates/NumberReference.vue'),
    },
    render() {
      return h('NumberReference', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderFootnoteReference = element => {
  return {
    components: {
      FootnoteReference: () =>
        import('../components/templates/FootnoteReference.vue'),
    },
    render() {
      return h('FootnoteReference', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderFootnote = element => {
  return {
    components: {
      Footnote: () => import('../components/templates/Footnote.vue'),
    },
    render() {
      return h('Footnote', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderDownloadReference = element => {
  return {
    components: {
      DownloadReference: () =>
        import('../components/templates/DownloadReference.vue'),
    },
    render() {
      return h('DownloadReference', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderFigure = element => {
  return {
    components: {
      Figure: () => import('../components/templates/Figure.vue'),
    },
    render() {
      return h('Figure', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderFigureCaption = element => {
  return {
    components: {
      FigureCaption: () => import('../components/templates/FigureCaption.vue'),
    },
    render() {
      return h('FigureCaption', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderImage = element => {
  return {
    components: {
      SphinxImage: () => import('../components/templates/Image.vue'),
    },
    render() {
      return h('SphinxImage', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderLegend = element => {
  return {
    components: {
      Legend: () => import('../components/templates/Legend.vue'),
    },
    render() {
      return h('Legend', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderCompound = element => {
  return {
    components: {
      Compound: () => import('../components/templates/Compound.vue'),
    },
    render() {
      return h('Compound', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderContainer = element => {
  return {
    components: {
      Container: () => import('../components/templates/Container.vue'),
    },
    render() {
      return h('Container', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderTopic = element => {
  return {
    name: 'AnonymousTopic',
    components: {
      Topic: () => import('../components/templates/Topic.vue'),
    },
    render() {
      return h('Topic', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderBlockQuote = element => {
  return {
    components: {
      BlockQuote: () => import('../components/templates/BlockQuote.vue'),
    },
    render() {
      return h('BlockQuote', {
        props: {
          element: element,
        },
      })
    },
  }
}

export const renderComment = element => {
  return {
    components: {
      Comment: () => import('../components/templates/Comment.vue'),
    },
    render() {
      return h('Comment', {
        props: {
          element: element,
        },
      })
    },
  }
}
