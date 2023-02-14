import { Notification } from 'context/UserContext/types';

type MdToHtmlProps = { notification: Notification };

const rules: [RegExp, string | ((opts: MdToHtmlProps) => string)][] = [
  //header rules
  [/#{6}\s?([^\n]+)/g, '<p>$1</p>'],
  [/#{5}\s?([^\n]+)/g, '<p>$1</p>'],
  [/#{4}\s?([^\n]+)/g, '<p>$1</p>'],
  [/#{3}\s?([^\n]+)/g, '<p>$1</p>'],
  [/#{2}\s?([^\n]+)/g, '<p>$1</p>'],
  [/#{1}\s?([^\n]+)/g, '<p>$1</p>'],

  //bold, italics and paragragh rules
  [/~~\s?([^\n]+)~~/g, '<s>$1</s>'],
  [/\*\*\s?([^\n]+)\*\*/g, '<b>$1</b>'],
  [/\*\s?([^\n]+)\*/g, '<i>$1</i>'],
  [/__([^_]+)__/g, '<b>$1</b>'],
  [/_([^_`]+)_/g, '<i>$1</i>'],
  [/([^\n]+\n?)/g, '<p>$1</p>'],

  //Lists
  // [/([^\n]+)(\+)([^\n]+)/g, '<ul><li>$3</li></ul>'],
  // [/([^\n]+)(\*)([^\n]+)/g, '<ul><li>$3</li></ul>'],
  // [/([^\n]*)(-)([^\n]+)/g, '<ul><li>$3</li></ul>'],

  //links
  [
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (opts) =>
      opts.notification.cta ? '<span>$1 ($2)</span>' : '<a href="$2" target="_blank">$1</a>',
  ],

  //Image
  [/!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g, '<img src="$2" alt="$1" title="$3" />'],
];

export default function mdToHtml(text: string, opts: MdToHtmlProps) {
  let html = text;
  rules.forEach(([rule, template]) => {
    html = html.replace(rule, typeof template === 'string' ? template : template(opts));
  });

  return html;
}
