export declare enum DeliveryStatus {
    GENERATED = "generated",
    SEND = "send",
    FAILED = "failed"
}
export declare enum TrackingType {
    DEVICE = "device",
    USER = "user",
    TRANSACTION = "transaction"
}
export declare class EmailLogs {
    id: number;
    to: string;
    from: string;
    cc: string;
    bcc: string;
    subject: string;
    body: string;
    template: string;
    data: string;
    purpose: string;
    tracking_id: string;
    tracking_type: string;
    fail_reason: string;
    aws_success_response: string;
    delivery_status: string;
    attachments: string;
    created_at: Date;
    updated_at: Date;
}
