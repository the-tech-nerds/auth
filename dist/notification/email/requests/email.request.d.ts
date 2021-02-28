export declare class EMAILRequest {
    to: string[];
    from?: string;
    cc?: string[];
    bcc?: string[];
    subject?: string;
    body?: string;
    template: string;
    data?: any;
    purpose?: string;
    tracking_id?: string;
    tracking_type?: string;
    fail_reason?: string;
    delivery_status?: string;
    attachments?: string;
}
