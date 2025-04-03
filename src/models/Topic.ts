export interface TopicProps {
    id: string;
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    parentTopicId?: string;
  }
  
  export class Topic implements TopicProps {
    public id: string;
    public name: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;
    public version: number;
    public parentTopicId?: string;
  
    constructor(props: TopicProps) {
      this.id = props.id;
      this.name = props.name;
      this.content = props.content;
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
      this.version = props.version;
      this.parentTopicId = props.parentTopicId;
    }
  
    updateContent(newContent: string): Topic {
      return new Topic({
        ...this,
        id: crypto.randomUUID(),
        content: newContent,
        version: this.version + 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }
  }